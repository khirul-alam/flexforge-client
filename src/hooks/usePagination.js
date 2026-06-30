import { useState } from 'react';

export function usePagination(initialPage = 1, initialLimit = 8) {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(1);

  return { page, setPage, limit, totalPages, setTotalPages };
}