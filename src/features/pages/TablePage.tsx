import React, { useState } from 'react';
import type { Post } from '../../store/types';
import PublicationsTable from '../../components/Table';
import PostDetails from '../../components/Details';
import { List } from 'lucide-react';

interface TableViewProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const TableView: React.FC<TableViewProps> = ({ posts, onEdit, onDelete }) => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  const handleViewPost = (id: number) => {
    setSelectedPostId(id);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedPostId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-lime-50 border border-lime-100">
            <List className="text-lime-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Table View
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-lime-700">{posts.length}</span> publications in table format
            </p>
          </div>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-lime-50 border border-lime-200">
          <List size={18} className="text-lime-700" />
          <span className="font-medium text-lime-700">Table View</span>
          <div className="w-2 h-2 rounded-full bg-lime-500"></div>
        </div>
      </div>

      <PublicationsTable posts={posts} onEdit={onEdit} onDelete={onDelete} onView={handleViewPost}/>

      {selectedPost && (
        <PostDetails post={selectedPost} onClose={handleCloseDetails} isOpen={isDetailsOpen}/>
      )}

      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-lime-400"></div>
            <span className="text-sm text-gray-600">Click any row to view details</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Show all table
        </div>
      </div>
    </div>
  );
};

export default TableView;