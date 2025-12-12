import React, { useRef, useState } from 'react';
import { fileValidate } from '../utils/fileValidation';
import ImagePreview from './ImgPreview';
import { AlertCircle, Upload, X, File, Image} from 'lucide-react';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({ files, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    setError('');
    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(newFiles).forEach(file => {
      const validation = fileValidate(file);
      if (validation.valid) {
        validFiles.push(file);
      }else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      setError(errors.join('. '));
    }

    if (validFiles.length > 0) {
      onChange([...files, ...validFiles]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleRemoveFile = (i: number) => {
    const newFiles = files.filter((_, i) => i !== i);
    onChange(newFiles);
    setError('');
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="text-blue-500" size={20} />;
    }
    return <File className="text-red-500" size={20} />;
  };

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        }`}>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,image/jpeg,application/pdf"
          onChange={handleChange}
          className="hidden"/>
        
        <Upload className="mx-auto text-gray-400 mb-3" size={48} />
        <p className="text-gray-600 font-medium mb-1">
          Haz clic o arrastra archivos aquí
        </p>
        <p className="text-sm text-gray-500">
          Solo archivos PDF y JPG (máx. 5MB)
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          <AlertCircle className="flex-shrink-0 mt-0.5" size={18} />
          <p>{error}</p>
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700">
            Archivos adjuntos ({files.length})
          </h4>
          
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                  {getFileIcon(file)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                    title="Eliminar archivo">
                    <X size={20} />
                  </button>
                </div>

                {file.type.startsWith('image/') && (
                  <ImagePreview file={file} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;