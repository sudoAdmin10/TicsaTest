import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/useRedux';
import { fetchPosts,createPost, updatePost, deletePost, setSelectedPost } from './store/postsSlice';
import type { PostModel } from './store/types';
import HomePage from './features/pages/HomePage';
import TableView from './features/pages/TablePage';
import CardsViewPage from './features/pages/CardsPage';
import FormComponent from './components/Form';
import Sidebar from './components/globals/Sidebar';
import Navbar from './components/globals/Navbar';
import { Loader, Menu, X } from 'lucide-react';

function App() {
  const dispatch = useAppDispatch();
  const { posts, loading, error, selectedPost } = useAppSelector( (state) => state.posts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (currentView === 'home' || currentView === 'table' || currentView === 'cards') {
      dispatch(fetchPosts());
    }
  }, [dispatch, currentView]);

  const handleOpenForm = () => {
    dispatch(setSelectedPost(null));
    setIsFormOpen(true);
  };

  const handleEdit = (post: PostModel) => {
    dispatch(setSelectedPost(post));
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      setIsDeleting(true);
      try {
        await dispatch(deletePost(id)).unwrap();
      } catch (error) {
        console.error('Error deleting:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSubmit = async (data: {
    title: string;
    body: string;
    files: File[];
  }) => {
    try {
      if (selectedPost) {
        await dispatch(
          updatePost({
            id: selectedPost.id,
            data: { title: data.title, body: data.body },
          })
        ).unwrap();
      } else {
        await dispatch(
          createPost({ title: data.title, body: data.body })
        ).unwrap();
      }
      setIsFormOpen(false);
      dispatch(setSelectedPost(null));
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    dispatch(setSelectedPost(null));
  };

  const handleRefresh = () => {
    dispatch(fetchPosts());
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getHeaderConfig = () => {
    switch (currentView) {
      case 'home':
        return {
          title: 'Home',
          subtitle: 'Manage your publications',
          loading: loading,
          onRefresh: handleRefresh,
          onNewPost: handleOpenForm
        };
      case 'table':
        return {
          title: 'Table View',
          subtitle: 'All publications in table format',
          loading: loading,
          onRefresh: handleRefresh,
          onNewPost: handleOpenForm
        };
      case 'cards':
        return {
          title: 'Card View',
          subtitle: 'All publications in card format',
          loading: loading,
          onRefresh: handleRefresh,
          onNewPost: handleOpenForm
        };
      default:
        return {
          title: 'Publications Manager',
          subtitle: '',
          loading: loading,
          onRefresh: handleRefresh,
          onNewPost: handleOpenForm
        };
    }
  };

  const renderContent = () => {
    const props = { posts, onEdit: handleEdit, onDelete: handleDelete };

    switch (currentView) {
      case 'home':
        return (
          <div className="p-4 sm:p-6 lg:p-8 w-full">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium text-sm">Error: {error}</p>
              </div>
            )}

            {loading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader className="animate-spin text-lime-600 mb-4" size={48} />
                <p className="text-gray-600 text-lg">Loading publications...</p>
              </div>
            ) : (
              <HomePage {...props} />
            )}
          </div>
        );

      case 'table':
        return (
          <div className="p-4 sm:p-6 lg:p-8 w-full">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium text-sm">Error: {error}</p>
              </div>
            )}

            {loading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader className="animate-spin text-lime-600 mb-4" size={48} />
                <p className="text-gray-600 text-lg">Loading publications...</p>
              </div>
            ) : (
              <TableView {...props} />
            )}
          </div>
        );

      case 'cards':
        return (
          <div className="p-4 sm:p-6 lg:p-8 w-full">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium text-sm">Error: {error}</p>
              </div>
            )}

            {loading && posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader className="animate-spin text-lime-600 mb-4" size={48} />
                <p className="text-gray-600 text-lg">Loading publications...</p>
              </div>
            ) : (
              <CardsViewPage {...props} />
            )}
          </div>
        );

      default:
        return (
          <div className="p-8 flex flex-col items-center justify-center w-full">
            <p className="text-gray-500 text-lg">Welcome to Publications Manager</p>
            <p className="text-gray-400 mt-2">Select a view from the sidebar</p>
          </div>
        );
    }
  };

  const headerConfig = getHeaderConfig();
  const contentMargin = !isMobile && isSidebarOpen ? 'ml-64' : (!isMobile && !isSidebarOpen ? 'ml-20' : 'ml-0');
  const contentWidth = !isMobile && isSidebarOpen ? 'w-[calc(100%-256px)]' : (!isMobile && !isSidebarOpen ? 'w-[calc(100%-80px)]' : 'w-full');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-lime-800 text-white rounded-lg shadow-lg hover:bg-lime-900 transition-colors">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

        <Sidebar currentView={currentView}  navigate={handleNavigate} isOpen={isSidebarOpen} tonggle={toggleSidebar} isMobile={isMobile} />

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${contentMargin} ${contentWidth}`}>
        
        <Navbar title={headerConfig.title} subtitle={headerConfig.subtitle} loading={headerConfig.loading} refresh={headerConfig.onRefresh}newPost={headerConfig.onNewPost}/>

        <main className="flex-1 overflow-y-auto bg-stone-50">
          {renderContent()}
        </main>
      </div>

      {isDeleting && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl border border-gray-200">
            <Loader className="animate-spin text-lime-600 mx-auto mb-3" size={40} />
            <p className="text-gray-700 font-medium">Deleting publication...</p>
          </div>
        </div>
      )}

      <FormComponent post={selectedPost} onSubmit={handleSubmit} onCancel={handleCancel}isOpen={isFormOpen}/>
    
    </div>

  );
}

export default App;