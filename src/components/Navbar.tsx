import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Map, Home, MessageSquare, ClipboardList, Settings, AlertTriangle } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', icon: <Home className="w-5 h-5 mr-2" />, text: 'Home' },
    { path: '/map', icon: <Map className="w-5 h-5 mr-2" />, text: 'Accessible Map' },
    { path: '/report', icon: <ClipboardList className="w-5 h-5 mr-2" />, text: 'Report Location' },
    { path: '/report-issue', icon: <AlertTriangle className="w-5 h-5 mr-2" />, text: 'Report Issue' },
    { path: '/chatbot', icon: <MessageSquare className="w-5 h-5 mr-2" />, text: 'Ask AccessBuddy' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">
                AccessBuddy
              </span>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                {item.icon}
                {item.text}
              </NavLink>
            ))}
            <div className="relative ml-3 flex items-center">
              <div className="dropdown inline-block relative">
                <button 
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  <span>Theme</span>
                </button>
                <div className="dropdown-content absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2">
                    <ThemeSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
              onClick={() => setIsOpen(false)}
              aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
              {item.icon}
              {item.text}
            </NavLink>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="px-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme Settings</p>
              <div className="mt-2">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;