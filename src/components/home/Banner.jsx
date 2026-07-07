'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-24 text-center text-white">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-4xl font-extrabold sm:text-5xl lg:text-6xl"
      >
        Forge Your Strongest Self
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className="mx-auto mt-4 max-w-xl text-lg text-white/90"
      >
        Discover fitness classes, connect with expert trainers, and track your
        journey — all in one place.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/all-classes"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-orange-600 shadow-lg hover:shadow-xl transition-shadow"
        >
          Explore Classes
        </Link>
      </motion.div>
    </section>
  );
}