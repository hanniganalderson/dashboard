// src/components/projects/GoalTracker.tsx
'use client';

import { motion } from 'framer-motion';

interface GoalProps {
  goal: {
    name: string;
    progress: number;
    target: number;
    current: number;
  };
}

const GoalTracker = ({ goal }: GoalProps) => {
  // Get progress bar color based on progress
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const progressColor = getProgressColor(goal.progress);

  return (
    <div className="py-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h4 className="text-base font-medium text-gray-900 dark:text-white">{goal.name}</h4>
        <div className="mt-1 sm:mt-0 flex items-center text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {goal.current} of {goal.target} complete
          </span>
          <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            {goal.progress}%
          </span>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${goal.progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-2.5 rounded-full ${progressColor}`}
          ></motion.div>
        </div>
        
        {/* Milestone markers */}
        <div className="w-full flex justify-between mt-1">
          <div className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"></div>
          <div className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;