'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function DashboardCard({
  title,
  children,
  className = '',
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
    </motion.div>
  );
}