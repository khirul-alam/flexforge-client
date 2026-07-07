'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ClassCard from '@/components/classes/ClassCard';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function FeaturedClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classes/featured`
      );
      const data = await res.json();
      setClasses(data.data || []);
    };
    fetchFeatured();
  }, []);

  if (classes.length === 0) return null;

  return (
    <section className="container mx-auto px-6 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center text-3xl font-bold"
      >
        Featured Classes
      </motion.h2>

      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {classes.map((cls) => (
          <motion.div key={cls._id} variants={itemVariants}>
            <ClassCard classData={cls} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}