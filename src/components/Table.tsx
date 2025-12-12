import React from 'react';
import { Edit2, Trash2, FileText, User } from 'lucide-react';
import type { Post } from '../store/types';

interface TableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const TableComponent: React.FC<TableProps> = ({ posts, onEdit, onDelete, onView }) => {
  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-lime-50 flex items-center justify-center">
          <FileText className="text-lime-400" size={28} />
        </div>
        <p className="text-gray-700 text-lg font-medium">No hay publicaciones disponibles</p>
        <p className="text-gray-400 text-sm mt-2">Crea una nueva publicación para comenzar</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-lime-50/50">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-lime-600" />
                  ID
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-lime-50/50">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-lime-50/50">
                Content
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 bg-lime-50/50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post, index) => {
              const truncatedBody = post.body.length > 60 
                ? post.body.substring(0, 60) + '...' 
                : post.body;

              return (
                <tr 
                  key={post.id} 
                  className="hover:bg-lime-50/30 transition-colors duration-150 group"
                   onClick={() => onView(post.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg border border-lime-100 mr-3">
                        <span className="text-sm font-semibold text-lime-700">
                          {post.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 capitalize line-clamp-2 max-w-xs">
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-md">
                      {truncatedBody}
                    </div>
                    {post.body.length > 50 && (
                      <div className="mt-1 inline-flex items-center text-xs text-lime-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span>Ver más</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(post)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-sky-700 hover:bg-sky-50 border border-gray-200 hover:border-sky-200 transition-all duration-200"
                        title="Editar">
                        <Edit2 size={14}/>
                      </button>
                      <button
                        onClick={() => onDelete(post.id)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-all duration-200"
                        title="Eliminar">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-lime-50/30 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime-400"></div>
            <p className="text-sm text-gray-700">
              Mostrando <span className="font-semibold text-gray-900">{posts.length}</span> publicaciones
            </p>
          </div>
          <div className="text-xs text-gray-400 font-medium">
            Total: {posts.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;