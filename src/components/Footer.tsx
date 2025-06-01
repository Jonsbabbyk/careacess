import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">About AccessBuddy</h3>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
              Making the Bronx more accessible for everyone through community-driven information and support.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:contact@accessbuddy.org" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary flex items-center">
                  <Mail className="h-5 w-5 mr-2" /> contact@accessbuddy.org
                </a>
              </li>
              <li>
                <a href="tel:+17181234567" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary flex items-center">
                  <Phone className="h-5 w-5 mr-2" /> (718) 123-4567
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary">Accessibility Statement</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex items-center justify-center">
          <p className="text-base text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} AccessBuddy. Made with <Heart className="inline-block h-4 w-4 text-red-500" aria-label="love" /> in the Bronx.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;