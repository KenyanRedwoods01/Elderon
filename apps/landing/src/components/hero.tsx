'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="block">Transform Legacy Systems with</span>
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quantum AI Precision
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            AI-powered enterprise modernization platform that analyzes, migrates, and optimizes
            your legacy systems with zero risk. Trusted by Fortune 500 companies worldwide.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-colors"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-3 text-base font-semibold text-gray-900 hover:border-gray-400 transition-colors"
            >
              <Play className="h-5 w-5" /> View Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
