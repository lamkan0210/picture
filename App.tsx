
import React, { useState, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Uploader } from './components/Uploader';
import { ResultGrid } from './components/ResultGrid';
import { SplitResult } from './types';
import { splitImageIntoGrid } from './utils/imageProcessor';

const App: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<SplitResult | null>(null);

  const handleUpload = useCallback(async (file: File) => {
    setIsProcessing(true);
    try {
      // 增加一个微小的延迟以展示处理状态，提升用户体验
      await new Promise(r => setTimeout(r, 800));
      const splitResult = await splitImageIntoGrid(file);
      setResult(splitResult);
    } catch (error) {
      console.error("Error splitting image:", error);
      alert("处理图片失败，请尝试其他图片。");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleReset = () => {
    setResult(null);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {!result && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                瞬间生成精美的九宫格切图
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                非常适合为 Instagram、朋友圈或小红书创建震撼的个人主页网格。
                快速、高清，且完全在您的浏览器中离线运行。
              </p>
            </div>

            <Uploader onUpload={handleUpload} isLoading={isProcessing} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-bolt"></i>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">极速处理</h4>
                <p className="text-sm text-slate-500">几秒钟内完成切分，无需服务器等待。</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-shield-halved"></i>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">隐私安全</h4>
                <p className="text-sm text-slate-500">图片永不离开您的设备，所有操作均在本地完成。</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-highlighter"></i>
                </div>
                <h4 className="font-bold text-slate-800 mb-2">高清质量</h4>
                <p className="text-sm text-slate-500">保留所有切片的原始清晰度和细节。</p>
              </div>
            </div>
          </div>
        )}

        {result && (
          <ResultGrid result={result} onReset={handleReset} />
        )}
      </div>
    </Layout>
  );
};

export default App;
