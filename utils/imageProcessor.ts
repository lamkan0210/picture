
import { SplitResult, ImageSlice } from '../types';

/**
 * Splits an image into a 3x3 grid.
 * @param file The image file to split
 * @returns A promise that resolves to the SplitResult
 */
export const splitImageIntoGrid = (file: File): Promise<SplitResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const slices: ImageSlice[] = [];
        const tileWidth = Math.floor(img.width / 3);
        const tileHeight = Math.floor(img.height / 3);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        canvas.width = tileWidth;
        canvas.height = tileHeight;

        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            ctx.clearRect(0, 0, tileWidth, tileHeight);
            
            // Source coordinates
            const sx = x * tileWidth;
            const sy = y * tileHeight;
            
            ctx.drawImage(
              img,
              sx, sy, tileWidth, tileHeight, // Source
              0, 0, tileWidth, tileHeight  // Destination
            );

            const id = y * 3 + x + 1;
            slices.push({
              id,
              dataUrl: canvas.toDataURL('image/png'),
              row: y,
              col: x,
              name: `slice_${id}.png`
            });
          }
        }

        resolve({
          slices,
          originalWidth: img.width,
          originalHeight: img.height
        });
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
};

/**
 * Triggers a download for a data URL
 */
export const downloadImage = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
