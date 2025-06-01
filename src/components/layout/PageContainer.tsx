import React, { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <main 
      className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 ${className}`}
      tabIndex={-1} // Makes the main content area programmatically focusable
    >
      {children}
    </main>
  );
};

export default PageContainer;