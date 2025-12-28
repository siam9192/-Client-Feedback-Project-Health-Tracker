function RiskCardSkeleton() {
  return (
    <div className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm animate-pulse">
      <span className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gray-300" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-gray-300 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 rounded mt-1" />
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="h-5 w-16 bg-gray-300 rounded-full" />
          <div className="h-5 w-16 bg-gray-300 rounded-full" />
        </div>
      </div>

      <div className="my-4 h-px bg-gray-200" />

      <div className="space-y-2">
        <div className="h-4 w-1/4 bg-gray-300 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="h-3 w-1/3 bg-gray-200 rounded" />
        <div className="h-3 w-1/4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default RiskCardSkeleton;
