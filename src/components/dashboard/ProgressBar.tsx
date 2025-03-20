// src/components/dashboard/ProgressBar.tsx
'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  label?: string;
  showValue?: boolean;
  height?: string;
  colorClass?: string;
}

export default function ProgressBar({ 
  progress, 
  label, 
  showValue = true, 
  height = 'h-2.5',
  colorClass = 'bg-blue-500'
}: ProgressBarProps) {
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between text-sm mb-1">
          {label && <span className="text-gray-600 dark:text-gray-400">{label}</span>}
          {showValue && <span className="font-medium text-gray-900 dark:text-white">{progress}%</span>}
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${height}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`${height} rounded-full ${colorClass}`}
        />
      </div>
    </div>
  );
}