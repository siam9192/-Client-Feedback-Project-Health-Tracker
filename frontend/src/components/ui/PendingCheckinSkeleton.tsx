function PendingCheckinSkeleton() {
  return (
    <div className="flex flex-col p-3 rounded-md border border-gray-200 animate-pulse bg-gray-50">
      {/* Name & status */}
      <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row justify-between lg:items-center mb-2">
        <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
        <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
      </div>

      {/* Health score & deadline */}
      <div className="mt-1 space-y-3">
        <div className="space-y-1">
          <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 max-w-sm">
          <div className="h-3 bg-gray-300 rounded-full" style={{ width: "50%" }} />
        </div>
        <div className="h-3 w-10 bg-gray-300 rounded text-xs text-gray-400"></div>
      </div>

      {/* Button */}
      <div className="flex justify-end mt-2">
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default PendingCheckinSkeleton;
