
import React, { useRef, useState } from 'react';

interface UploaderProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export const Uploader: React.FC<UploaderProps> = ({ onUpload, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (files[0].type.startsWith('image/')) {
        onUpload(files[0]);
      } else {
        alert('请上传图片文件（PNG, JPG 等）');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  return (
    <div 
      className={`
        relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200
        ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-white hover:border-indigo-400'}
        ${isLoading ? 'opacity-50 pointer-events-none' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        className="hidden" 
        accept="image/*" 
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
          <i className="fas fa-cloud-arrow-up text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">上传您的图片</h3>
        <p className="text-slate-500 mb-6 max-w-xs mx-auto">
          将图片拖放到此处，或点击按钮浏览文件。
          图片将自动被切分为 9 个相等的部分。
        </p>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center space-x-2"
        >
          <span>选择图片</span>
          <i className="fas fa-folder-open"></i>
        </button>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-2xl">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-2"></div>
            <span className="text-sm font-medium text-indigo-600">正在处理...</span>
          </div>
        </div>
      )}
    </div>
  );
};
