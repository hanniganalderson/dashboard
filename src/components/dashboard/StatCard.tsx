'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  isPositive?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  isPositive = true,
  className = '',
  icon
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm ${className}`}
    >
      <div className="flex items-center">
        {icon && <div className="mr-3">{icon}</div>}
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
            {title}
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <div className="mt-1">
              <span className={`text-sm ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isPositive ? '↑' : '↓'} {change}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}