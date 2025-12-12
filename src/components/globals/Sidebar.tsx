import React from 'react'; 
import { FileText, Github, Menu} from 'lucide-react';
import { navItems } from '../../global/nav-data';

interface SidebarProps {
  currentView?: string;
  navigate?: (view: string) => void;
  isOpen?: boolean;
  tonggle?: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView = 'posts', 
  navigate, 
  isOpen = true,
  tonggle,
  isMobile = false
}) => {
  const handleNavigation = (itemId: string) => {
    if (navigate) {
      navigate(itemId);
    }
    if (tonggle && isMobile) {
      tonggle();
    }
  };

  if (isMobile && !isOpen) {return null;}

  return (
    <>
      {!isMobile && (
        <aside
          className={`
            hidden lg:flex flex-col h-full bg-stone-50 shadow-xl z-30 fixed left-0 top-0
            transition-all duration-300 ease-in-out
            ${isOpen ? 'w-64' : 'w-20'}
          `}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 min-h-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-lime-600 rounded-lg flex items-center justify-center" onClick={tonggle} >
                    <Menu className="text-white " size={24} />
                  </div>
                  {isOpen && (
                    <div className="">
                      <h2 className="font-bold text-gray-800">TICSA</h2>
                      <p className="text-xs text-gray-500">Technical Test</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavigation(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-3 py-3 rounded-lg
                          transition-all duration-200
                          ${isActive 
                            ? 'text-lime-800 bg-lime-200/50 hover:bg-lime-100/50 border border-lime-800/30' 
                            : 'text-lime-600 hover:bg-lime-100/50'
                          }
                          ${!isOpen ? 'justify-center px-2' : ''}
                        `}
                        title={!isOpen ? item.label : ''}>
                        <Icon 
                          size={20} 
                          className={`flex-shrink-0 ${isActive ? 'text-lime-700' : 'text-lime-500'}`} />
                        {isOpen && (
                          <span className="font-medium text-sm">{item.label}</span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-b border-gray-200">
              {isOpen ? (
                <div className="space-y-3">
                  <a
                    href="https://github.com/sudoAdmin10/TicsaTest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 text-lime-800 hover:bg-lime-100/50 rounded-lg transition-colors">
                    <Github size={15} className="text-lime-800"/>
                    <span className="text-xs font-medium">GitHub</span>
                  </a>
                  
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-lime-300">
                        <img 
                          src="/src/assets/profile.webp" 
                          alt="Profile" 
                          className="w-full h-full object-cover"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 truncate">Alan del Toro</p>
                        <p className="text-xs font-semibold text-lime-600 truncate">Web Developer</p>
                      </div>
                    </div>
                  </div>
                </div>

              ) : (

                <div className="flex flex-col items-center gap-3">
                  <a
                    href="https://github.com/sudoAdmin10/TicsaTest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-lime-700 hover:bg-lime-100/50 rounded-lg transition-colors"
                    title="gihub">
                    <Github size={20} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </aside>
      )}

      {/* Mobile*/}
      {isMobile && isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={tonggle}/>
          
          <aside
            className={`
              lg:hidden fixed top-0 left-0 h-full bg-white shadow-xl z-40
              transition-transform duration-300 ease-in-out
              translate-x-0
              w-64
            `}>
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lime-600 to-lime-700 rounded-lg flex items-center justify-center">
                      <FileText className="text-white" size={24} />
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800">Technical Test</h2>
                      <p className="text-xs text-gray-500">TICSA Communications</p>
                    </div>
                  </div>
                </div>
              </div>

              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;

                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => handleNavigation(item.id)}
                          className={`
                            w-full flex items-center gap-3 px-3 py-3 rounded-lg
                            transition-all duration-200
                            ${isActive 
                              ? 'bg-lime-50 border-l-4 border-lime-500' 
                              : 'text-lime-700 hover:bg-gray-100'
                            }
                          `}>
                          <Icon 
                            size={20} 
                            className={`flex-shrink-0 ${isActive ? 'text-lime-600' : 'text-gray-500'}`} />
                          <span className="font-medium text-sm">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="p-4 border-t border-b border-gray-200">
                <div className="space-y-3">
                  <a
                    href="https://github.com/sudoAdmin10/TicsaTest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Github size={16} className="text-lime-800"/>
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                  
                  <div className="px-3 py-2 bg-lime-50 to-lime-50 border border-lime-200 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Alan del Toro</p>
                    <p className="text-xs font-semibold text-lime-600">Web Developer</p>
                  </div>
                </div>
              </div>

            </div>
          </aside>
        </>
      )}
    </>

  );
};

export default Sidebar;