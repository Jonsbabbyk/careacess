import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <div className="mb-8">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-4xl text-lg text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;