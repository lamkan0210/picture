
import React from 'react';
import { SplitResult, ImageSlice } from '../types';
import { downloadImage } from '../utils/imageProcessor';

interface ResultGridProps {
  result: SplitResult;
  onReset: () => void;
}

export const ResultGrid: React.FC<ResultGridProps> = ({ result, onReset }) => {
  const downloadAll = () => {
    result.slices.forEach((slice, index) => {
      setTimeout(() => {
        downloadImage(slice.dataUrl, slice.name);
      }, index * 200);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">切分结果</h2>
          <p className="text-slate-500">原始分辨率：{result.originalWidth} x {result.originalHeight}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onReset}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium transition-colors border border-slate-200 rounded-lg bg-white"
          >
            重新开始
          </button>
          <button 
            onClick={downloadAll}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center space-x-2"
          >
            <i className="fas fa-download"></i>
            <span>全部下载</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto bg-slate-200 p-2 sm:p-4 rounded-xl shadow-inner">
        {result.slices.map((slice) => (
          <div key={slice.id} className="group relative bg-white aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
            <img 
              src={slice.dataUrl} 
              alt={`切片 ${slice.id}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
              <span className="text-white text-xs font-bold mb-2">#{slice.id}</span>
              <button 
                onClick={() => downloadImage(slice.dataUrl, slice.name)}
                className="bg-white text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                title="下载此切片"
              >
                <i className="fas fa-download text-sm"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
        <i className="fas fa-circle-info text-amber-500 mt-1"></i>
        <div className="text-sm text-amber-800">
          <p className="font-semibold mb-1">社交媒体小贴士：</p>
          <p>在发布朋友圈或 Instagram 时，请按倒序（从第 9 张到第 1 张）上传图片，这样在主页上就能展示出完美的九宫格拼接效果！</p>
        </div>
      </div>
    </div>
  );
};
