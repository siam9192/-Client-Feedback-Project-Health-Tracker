import React from "react";

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode; 
}

function PageHeading({ title, subtitle, rightContent }: PageHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Left content */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-500 text-sm mt-1 font-secondary">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right actions */}
      {rightContent && (
        <div className="flex items-center gap-2">
          {rightContent}
        </div>
      )}
    </div>
  );
}

export default PageHeading;
