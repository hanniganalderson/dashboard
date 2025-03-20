// src/components/dashboard/DashboardCard.tsx
'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  isPrivate?: boolean;
  showPrivateToggle?: boolean;
}

export default function DashboardCard({
  title,
  children,
  className = '',
  isPrivate = false,
  showPrivateToggle = false,
}: DashboardCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden ${className}`}
    >
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          {title}
        </h3>
        {showPrivateToggle && (
          <span className={`px-2 py-1 text-xs rounded-full ${isPrivate ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
            {isPrivate ? 'Private' : 'Public'}
          </span>
        )}
      </div>
      <div className="px-4 py-5 sm:p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {children}
      </div>
    </motion.div>
  );
}

// Additional utility component for displaying stats
export function StatCard({ 
  title, 
  value, 
  change, 
  isPositive = true,
  isPrivate = false,
  className = ''
}: { 
  title: string; 
  value: string | number; 
  change?: string | number; 
  isPositive?: boolean;
  isPrivate?: boolean;
  className?: string;
}) {
  // If data is private, mask the actual values
  const displayValue = isPrivate ? '•••••' : value;
  const displayChange = isPrivate ? '•••' : change;

  return (
    <div className={`p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg ${className}`}>
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
    </div>
  );
}