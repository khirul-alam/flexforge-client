'use client';

import { useEffect, useState } from 'react';
import ClassCard from '@/components/classes/ClassCard';

export default function FeaturedClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/classes/featured`);
      const data = await res.json();
      setClasses(data.data || []);
    };
    fetchFeatured();
  }, []);

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Featured Classes</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((cls) => (
          <ClassCard key={cls._id} classData={cls} />
        ))}
      </div>
    </section>
  );
}