import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  fullScreen = false 
}) => {
  // Size mapping using Tailwind classes
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-slate-200 border-t-blue-600`}
        role="status"
        aria-label="loading"
      />
      <span className="text-xs font-medium text-slate-500">Loading...</span>
    </div>
  );

  // Render centered in a container OR full screen modal style
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-xs">
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          {spinner}
        </div>
      </div>
    );
  }

  return <div className="flex justify-center p-8">{spinner}</div>;
};