import React, { useState, useRef, useEffect } from 'react';
import { Plus, RefreshCw, User, Settings, LogOut,ChevronDown } from 'lucide-react';

interface NavbarProps {
  title: string;
  subtitle?: string;
  loading?: boolean;
  refresh?: () => void;
  newPost?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  title,
  subtitle,
  loading = false,
  refresh,
  newPost,

}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const downRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOut = (event: MouseEvent) => {
      if (downRef.current && !downRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', clickOut);
    return () => document.removeEventListener('mousedown', clickOut);
  }, []);

  return (
    <header className="bg-stone-50 border-b border-gray-200 sticky top-0 z-30 min-h-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center gap-4">
            <div className="flex-1 min-w-0 overflow-hidden">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-500 truncate mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-4 pt-4">
            {refresh && (
              <button
                onClick={refresh}
                disabled={loading}
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-lime-600 text-gray-700 hover:bg-lime-50 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh">
                <RefreshCw className={loading ? 'animate-spin' : 'text-lime-800'} size={18} />
              </button>
            )}

            {newPost && (
              <button
                onClick={newPost}
                className="hidden sm:inline-flex items-center gap-1 h-10 px-4 bg-lime-600 text-white text-sm font-medium rounded-lg hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 transition-colors shadow-sm">
                <Plus size={18} />
                <span>New</span>
              </button>
            )}

            {newPost && (
              <button
                onClick={newPost}
                className="sm:hidden inline-flex items-center justify-center h-10 w-10 bg-lime-600 text-white rounded-lg hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-colors"
                title="Nueva Publicación">
                <Plus size={18} />
              </button>
            )}

            <div className="relative " ref={downRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="inline-flex items-center gap-2 h-10 pl-2 pr-3 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-colors">
                <div className="w-7 h-7 bg-gradient-to-br from-lime-500 to-lime-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}/>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Alan del Toro</p>
                    <p className="text-xs text-gray-500 mt-0.5">example@email.com</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-lime-50 transition-colors">
                      <User size={16} />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-lime-50 transition-colors">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;