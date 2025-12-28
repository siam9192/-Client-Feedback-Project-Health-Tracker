"use client";

import React from "react";

const HighRiskProjectCardSkeleton: React.FC = () => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow animate-pulse">
      <div className="h-6 w-3/4 bg-red-200 rounded mb-2"></div>

      <div className="h-4 w-1/2 bg-red-200 rounded mb-1"></div>

      <div className="h-4 w-1/3 bg-red-200 rounded mb-1"></div>

      <div className="h-4 w-1/4 bg-red-200 rounded mb-2"></div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div className="h-3 rounded-full bg-red-300 w-2/3"></div>
      </div>

      <div className="h-4 w-1/2 bg-red-200 rounded mb-2"></div>

      <div className="space-y-1">
        <div className="h-3 w-full bg-red-200 rounded"></div>
        <div className="h-3 w-5/6 bg-red-200 rounded"></div>
        <div className="h-3 w-3/4 bg-red-200 rounded"></div>
        <div className="h-3 w-2/3 bg-red-200 rounded"></div>
      </div>
    </div>
  );
};

export default HighRiskProjectCardSkeleton;
