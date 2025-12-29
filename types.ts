
export interface ImageSlice {
  id: number;
  dataUrl: string;
  row: number;
  col: number;
  name: string;
}

export interface SplitResult {
  slices: ImageSlice[];
  originalWidth: number;
  originalHeight: number;
}
