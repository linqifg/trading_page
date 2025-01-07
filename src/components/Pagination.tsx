import React from 'react';

interface PaginationProps {
  total: number;
  current: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onChange: (page: number, pageSize: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  pageSize,
  pageSizeOptions = [30, 50, 100],
  onChange
}) => {
  const totalPages = Math.ceil(total / pageSize);
  
  // Calculate visible page range
  const getVisiblePages = () => {
    const delta = window.innerWidth >= 768 ? 2 : 1; // Show more pages on larger screens
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach(i => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">每页显示:</span>
        <select
          value={pageSize}
          onChange={(e) => onChange(1, Number(e.target.value))}
          className="px-2 py-1 border rounded-md text-sm"
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => current > 1 && onChange(current - 1, pageSize)}
          disabled={current === 1}
          className={`px-3 py-1 rounded-md text-sm ${
            current === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          上一页
        </button>

        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-sm text-gray-500">...</span>
            ) : (
              <button
                onClick={() => typeof page === 'number' && onChange(page, pageSize)}
                className={`px-3 py-1 rounded-md text-sm ${
                  current === page
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => current < totalPages && onChange(current + 1, pageSize)}
          disabled={current === totalPages}
          className={`px-3 py-1 rounded-md text-sm ${
            current === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          下一页
        </button>
      </div>

      <div className="text-sm text-gray-600">
        共 {total} 条
      </div>
    </div>
  );
};