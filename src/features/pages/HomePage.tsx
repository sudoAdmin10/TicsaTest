import React, { useState } from 'react';
import type { PostModel } from '../../store/types';
import { Grid, List, FileText } from 'lucide-react';
import TableComponent from '../../components/Table';
import CardComponent from '../../components/Card';
import PostDetails from '../../components/Details';

interface HomePageProps {
  posts: PostModel[];
  onEdit: (post: PostModel) => void;
  onDelete: (id: number) => void;
}

type ViewMode = 'cards' | 'table';

const HomePage: React.FC<HomePageProps> = ({ posts, onEdit, onDelete }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const selectedPost = posts.find(post => post.id === selectedPostId);

  const showPost = (id: number) => {
    setSelectedPostId(id);
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    setSelectedPostId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-lime-50 border border-lime-100">
            <FileText className="text-lime-600" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Home Page
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-lime-700">{posts.length}</span> publications • Switch between views
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-white rounded-xl shadow-sm border border-gray-200 p-1.5">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
              viewMode === 'cards'
                ? 'bg-lime-50 text-lime-700 border border-lime-200 shadow-xs'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            aria-label="Card view">
            <Grid size={18} />
            <span className="font-medium">Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
              viewMode === 'table'
                ? 'bg-lime-50 text-lime-700 border border-lime-200 shadow-xs'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            aria-label="Table view">
            <List size={18} />
            <span className="font-medium">Table</span>
          </button>
        </div>
      </div>

      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <CardComponent key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} onView={showPost} />
            ))
          )}
        </div>
      )}

      {viewMode === 'table' && (
        <TableComponent posts={posts}  onEdit={onEdit} onDelete={onDelete} onView={showPost}/>
      )}

      {selectedPost && (
        <PostDetails post={selectedPost} onClose={closeDetails} isOpen={isDetailsOpen}/>
      )}

    </div>
  );
};

export default HomePage;