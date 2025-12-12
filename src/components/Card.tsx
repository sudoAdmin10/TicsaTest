import React from 'react';
import type { Post } from '../store/types';
import { Edit2, FileText, Trash2, User, ChevronRight } from 'lucide-react';

interface CardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const CardComponent: React.FC<CardProps> = ({ post, onEdit, onDelete, onView }) => {
  const truncatedBody = post.body.length > 80 ? post.body.substring(0, 80) + '...' : post.body;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 hover:border-lime-200" onClick={() => onView(post.id)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-zinc-100 border border-gray-100">
            <FileText className="text-gray-600" size={16} />
          </div>
          <span className="text-xs font-medium text-gray-500">
            ID: <span className="font-semibold text-gray-700">{post.id}</span>
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(post)}
            className="p-2 text-gray-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all duration-200"
            title="Editar publicación">
            <Edit2 size={16}/>
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
            title="Eliminar publicación">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 capitalize tracking-tight">
        {post.title}
      </h3>

      <div className="mb-5">
        <p className="text-gray-600 text-sm leading-relaxed">
          {truncatedBody}
        </p>
        {post.body.length > 50 && (
          <div className="mt-2 inline-flex items-center text-xs text-lime-600 font-medium">
            <span>Leer más</span>
            <ChevronRight size={12} className="ml-1" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-lime-50">
            <User size={12} className="text-lime-600" />
          </div>
          <span className="text-xs font-medium text-gray-600">
            Usuario <span className="text-gray-900">{post.userId}</span>
          </span>
        </div>
        
        <div className="w-2 h-2 rounded-full bg-lime-300 group-hover:bg-lime-400 transition-colors duration-300"></div>
      </div>
    </div>
  );
};

export default CardComponent;