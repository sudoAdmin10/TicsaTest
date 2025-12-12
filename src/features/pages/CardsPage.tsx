import React, { useState } from 'react';
import type { Post } from '../../store/types';
import { FileText, Grid, LayoutGrid } from 'lucide-react';
import PublicationsCard from '../../components/Card';
import PostDetails from '../../components/Details';

interface CardsViewProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

const CardsViewPage: React.FC<CardsViewProps> = ({ posts, onEdit, onDelete }) => {
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
            <LayoutGrid className="text-lime-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Cards View
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-lime-700">{posts.length}</span> publications in card format
            </p>
          </div>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-lime-50 border border-lime-200">
          <Grid size={18} className="text-lime-700" />
          <span className="font-medium text-lime-700">Cards View</span>
          <div className="w-2 h-2 rounded-full bg-lime-500"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-lime-50 flex items-center justify-center">
              <FileText className="text-lime-400" size={28} />
            </div>
            <p className="text-gray-700 text-lg font-medium">No publications available</p>
            <p className="text-gray-400 text-sm mt-2">Create a new post to get started</p>
          </div>
        ) : (
          posts.map((post) => (
            <PublicationsCard
              key={post.id}
              post={post}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={handleViewPost}
            />
          ))
        )}
      </div>

      {selectedPost && (
        <PostDetails
          post={selectedPost}
          onClose={handleCloseDetails}
          isOpen={isDetailsOpen}
        />
      )}

      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-lime-400"></div>
            <span className="text-sm text-gray-600">Click any card to view details</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          {posts.length} cards | {Math.ceil(posts.length / 4)} rows
        </div>
      </div>
    </div>
  );
};

export default CardsViewPage;