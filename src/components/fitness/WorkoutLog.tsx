// src/components/fitness/WorkoutLog.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiActivity, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface Workout {
  id: string;
  date: string;
  type: string;
  duration: number;
  exercises: string[];
  notes?: string;
}

interface WorkoutLogProps {
  workouts: Workout[];
}

export default function WorkoutLog({ workouts }: WorkoutLogProps) {
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);

  // Toggle expanded workout details
  const toggleExpand = (id: string) => {
    if (expandedWorkout === id) {
      setExpandedWorkout(null);
    } else {
      setExpandedWorkout(id);
    }
  };

  // Get workout type badge color
  const getWorkoutTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'strength':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'cardio':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'hiit':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'flexibility':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      {workouts.length === 0 ? (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          No workouts logged yet.
        </div>
      ) : (
        workouts.map((workout) => (
          <div key={workout.id} className="py-4">
            <div 
              className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
              onClick={() => toggleExpand(workout.id)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className={`px-2 py-1 text-xs font-medium rounded-md ${getWorkoutTypeColor(workout.type)}`}>
                    {workout.type}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiCalendar className="mr-1" />
                    <span>{new Date(workout.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <FiClock className="mr-1" />
                    <span>{workout.duration} min</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-900 dark:text-white">
                    {workout.exercises.join(', ')}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:mt-0 sm:ml-4">
                <button
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label={expandedWorkout === workout.id ? 'Collapse details' : 'Expand details'}
                >
                  {expandedWorkout === workout.id ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
            
            {expandedWorkout === workout.id && workout.notes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 ml-10 sm:ml-14 p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
              >
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">Notes</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{workout.notes}</p>
              </motion.div>
            )}
          </div>
        ))
      )}
    </div>
  );
}