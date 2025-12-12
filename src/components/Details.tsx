import React from 'react';
import type { Post } from '../store/types';
import { FileText, X, User, Globe, FileDigit } from 'lucide-react';

interface PostDetailsProps {
  post: Post;
  onClose: () => void;
  isOpen: boolean;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post, onClose, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">

        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-lime-50 border border-lime-100">
              <FileText className="text-lime-600" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Publication Details
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                View complete information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 text-gray-500 hover:text-gray-700"
            aria-label="Close details">
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50/30">
              <div className="flex items-center gap-2 mb-2">
                <FileDigit size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Publication ID</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-lime-100 text-lime-800 rounded-lg font-semibold text-sm">
                  #{post.id}
                </div>
                <span className="text-xs text-gray-500">Unique identifier</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50/30">
              <div className="flex items-center gap-2 mb-2">
                <User size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Author</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-lime-50 border border-lime-100 text-lime-700 rounded-lg font-medium text-sm">
                  User #{post.userId}
                </div>
                <span className="text-xs text-gray-500">Author ID</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-lime-500"></div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Title
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-white">
              <h2 className="text-lg font-bold text-gray-900 capitalize">
                {post.title}
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-white border border-lime-200 rounded-md text-lime-700">
                  {post.title.split(' ').length} words
                </span>
                <span className="text-xs px-2 py-1 bg-white border border-lime-200 rounded-md text-lime-700">
                  {post.title.length} characters
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-lime-400"></div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Content
              </h3>
            </div>
            <div className="p-4 rounded-xl bg-white">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.body}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-3">
                  <span className="text-xs px-2 py-1 border border-lime-200 text-lime-700 rounded-md">
                    {post.body.split(' ').length} words
                  </span>
                  <span className="text-xs px-2 py-1 border border-lime-200 text-lime-700 rounded-md">
                    {post.body.length} characters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-lime-50/30 border-t border-gray-100 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime-400"></div>
              <p className="text-xs text-gray-600 font-medium">
                Viewing publication details
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Globe size={12} />
              <span>Demo publication</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostDetails;