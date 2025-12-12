import React, { useState, useEffect } from 'react';
import type { Post } from '../store/types';
import FileUploadComponent from './FileUpload';
import { FileText, Save, X, AlertCircle } from 'lucide-react';

interface FormProps {
  post?: Post | null;
  onSubmit: (data: { title: string; body: string; files: File[] }) => void;
  onCancel: () => void;
  isOpen: boolean;
}

const FormComponent: React.FC<FormProps> = ({ post, onSubmit, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        body: post.body,
      });
    } else {
      setFormData({ title: '', body: '' });
      setFiles([]);
    }
  }, [post]);

  const handleChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateBody = (): boolean => {
    const newErrors: { title?: string; body?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Content is required';
    } else if (formData.body.length < 10) {
      newErrors.body = 'Content must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateBody()) {
      return;
    }

    onSubmit({
      title: formData.title.trim(),
      body: formData.body.trim(),
      files,
    });

    setFormData({ title: '', body: '' });
    setFiles([]);
    setErrors({});
  };

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-lime-50 border border-lime-100">
              <FileText className="text-lime-600" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {post ? 'Edit Publication' : 'New Publication'}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {post ? 'Update your existing post' : 'Create a new publication'}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-500 hover:text-gray-700"
            aria-label="Close form">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-800 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChage}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-300 transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                errors.title 
                  ? 'border-red-300 bg-red-50 focus:ring-red-200 focus:border-red-300' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-lime-300'
              }`}
              placeholder="Enter an engaging title..."
            />
            {errors.title && (
              <div className="mt-2 flex items-start gap-2 text-sm text-red-600">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-800 mb-2">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChage}
              rows={6}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-lime-400 focus:border-lime-300 transition-all duration-200 resize-none text-gray-900 placeholder-gray-400 ${
                errors.body 
                  ? 'border-red-300 bg-red-50 focus:ring-red-200 focus:border-red-300' 
                  : 'border-gray-200 hover:border-gray-300 focus:border-lime-300'
              }`}
              placeholder="Write your publication content..."/>
            {errors.body && (
              <div className="mt-2 flex items-start gap-2 text-sm text-red-600">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{errors.body}</span>
              </div>
            )}
            <div className="mt-3 flex items-center justify-between">
              <p className={`text-sm font-medium ${
                formData.body.length < 10 ? 'text-red-500' : 'text-gray-500'
              }`}>
                {formData.body.length} characters
              </p>
              {formData.body.length < 10 && formData.body.length > 0 && (
                <p className="text-xs text-red-500 font-medium">
                  Minimum 10 characters required
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-3">
              Attachments <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <FileUploadComponent files={files} onChange={handleFilesChange} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 hover:border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3.5 bg-lime-600 text-white font-medium rounded-xl hover:bg-lime-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
            >
              <Save size={20} className="group-hover:scale-105 transition-transform duration-200" />
              {post ? 'Update Publication' : 'Create Publication'}
            </button>
          </div>
        </form>

        <div className="px-6 py-4 bg-lime-50/30 border-t border-gray-100 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime-400"></div>
            <p className="text-xs text-gray-600 font-medium">
              {post ? 'Editing' : 'Creating'} publication ID: {post ? post.id : 'new'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;