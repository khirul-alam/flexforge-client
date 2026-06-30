'use client';

import { useEffect, useState } from 'react';
import ClassCard from '@/components/classes/ClassCard';
import SearchFilterBar from '@/components/classes/SearchFilterBar';

export default function AllClassesPage() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 8;

  useEffect(() => {
    const fetchClasses = async () => {
      const params = new URLSearchParams({
        search,
        categories: categories.join(','),
        page,
        limit,
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes?${params}`);
      const data = await res.json();
      setClasses(data.data || []);
      setTotalPages(data.totalPages || 1);
    };

    fetchClasses();
  }, [search, categories, page]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">All Fitness Classes</h1>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        categories={categories}
        setCategories={setCategories}
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {classes.map((cls) => (
          <ClassCard key={cls._id} classData={cls} />
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`rounded-md px-4 py-2 ${
              page === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}