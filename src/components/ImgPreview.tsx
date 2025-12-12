import { Loader, Image as ImageIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface ImgPreviewProps {
  file: File;
}

const ImgPreviewComponent: React.FC<ImgPreviewProps> = ({ file }) => {
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!file.type.startsWith('image/')) {
      setLoading(false);
      return;
    }

    const reader = new FileReader();

    reader.onloadstart = () => {
      setLoading(true);
      setError(false);
    };

    reader.onload = () => {
      setPreview(reader.result as string);
      setLoading(false);
    };

    reader.onerror = () => {
      setError(true);
      setLoading(false);
    };

    reader.readAsDataURL(file);

    return () => {
      if (reader.readyState === 1) {
        reader.abort();
      }
    };
  }, [file]);

  if (!file.type.startsWith('image/')) {
    return (
      <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center gap-2">
          <ImageIcon size={16} className="text-gray-400" />
          <p className="text-sm text-gray-600">
            Preview not available for {file.type.split('/')[1]?.toUpperCase() || 'this file type'}
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-3 flex flex-col items-center justify-center p-6 bg-lime-50/30 border border-lime-100 rounded-xl">
        <Loader className="animate-spin text-lime-600 mb-2" size={24} />
        <span className="text-sm text-gray-600">Loading preview...</span>
        <span className="text-xs text-gray-500 mt-1">{file.name}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <p className="text-sm font-medium text-red-700">Error loading preview</p>
        </div>
        <p className="text-xs text-red-600">Unable to load image preview for {file.name}</p>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-700">Preview</p>
        <span className="text-xs text-gray-500">
          {Math.round(file.size / 1024)} KB
        </span>
      </div>
      
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 group">
        <img
          src={preview}
          alt={`Preview of ${file.name}`}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setError(true)}/>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-xs text-white font-medium truncate">{file.name}</p>
          <p className="text-xs text-white/80">
            {file.type.split('/')[1]?.toUpperCase()} • {Math.round(file.size / 1024)} KB
          </p>
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <ImageIcon size={12} />
          {file.type.split('/')[1]?.toUpperCase()}
        </span>
        <span>{Math.round(file.size / 1024)} KB</span>
      </div>
    </div>
  );
};

export default ImgPreviewComponent;