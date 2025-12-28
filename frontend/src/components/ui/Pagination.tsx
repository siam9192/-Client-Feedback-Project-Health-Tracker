interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {/* Previous */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="
          px-4 py-2 text-sm rounded-lg border
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-gray-100
        "
      >
        Prev
      </button>

      {/* Page Info */}
      <span className="text-sm text-gray-600">
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="
          px-4 py-2 text-sm rounded-lg border
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:bg-gray-100
        "
      >
        Next
      </button>
    </div>
  );
}
