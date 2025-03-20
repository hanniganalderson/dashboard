// src/components/dashboard/StatCard.tsx
'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  isPositive?: boolean;
  isPrivate?: boolean;
  className?: string;
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  isPositive = true,
  isPrivate = false,
  className = ''
}: StatCardProps) {
  // Component code...
  // If data is private, mask the actual values
  const displayValue = isPrivate ? '•••••' : value;
  const displayChange = isPrivate ? '•••' : change;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm ${className}`}
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
        {title}
      </p>
      <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
        {displayValue}
      </p>
      {change && (
        <div className="mt-1">
          <span className={`text-sm ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isPositive ? '↑' : '↓'} {displayChange}
          </span>
        </div>
      )}
    </motion.div>
  );
}