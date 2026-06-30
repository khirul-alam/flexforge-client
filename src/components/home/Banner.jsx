'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-24 text-center text-white">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold sm:text-5xl"
      >
        Forge Your Strongest Self
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-4 max-w-xl text-lg text-white/90"
      >
        Discover fitness classes, connect with expert trainers, and track your journey — all in one place.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link
          href="/all-classes"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-orange-600"
        >
          Explore Classes
        </Link>
      </motion.div>
    </section>
  );
}