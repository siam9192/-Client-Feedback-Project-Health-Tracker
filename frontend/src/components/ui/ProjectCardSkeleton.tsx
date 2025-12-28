function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-5 animate-pulse font-secondary space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
      </div>

      {/* Description */}
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>

      {/* Progress */}
      <div className="mb-4 space-y-1">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
          <div className="h-3 w-10 bg-gray-200 rounded"></div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gray-300 h-2 rounded-full w-1/2"></div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <div className="h-3 w-20 bg-gray-200 rounded mb-1"></div>
          <div className="h-4 w-10 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-3 w-16 bg-gray-200 rounded mb-1"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Team */}
      <div className="space-y-1">
        <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-5 w-16 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center justify-end gap-2">
        <div className="h-7 w-20 bg-gray-200 rounded"></div>
        <div className="h-7 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default ProjectCardSkeleton;
