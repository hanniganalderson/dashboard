'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiHeart, FiMoon, FiTrendingUp } from 'react-icons/fi';
import DashboardCard from '@/components/dashboard/DashboardCard';
import WorkoutLog from '@/components/fitness/WorkoutLog';
import NutritionTracker from '@/components/fitness/NutritionTracker';
import SleepTracker from '@/components/fitness/SleepTracker';

// Sample data for demonstration
const sampleWorkouts = [
  {
    id: '1',
    date: '2024-03-15',
    type: 'Strength',
    duration: 75,
    exercises: [
      'Bench Press 3x8 @ 185lbs',
      'Squats 4x6 @ 225lbs',
      'Deadlifts 3x5 @ 275lbs'
    ],
    notes: 'Great session, increased weight on all lifts'
  }
];

const sampleNutritionData = [
  {
    date: '2024-03-15',
    calories: 2800,
    protein: 180,
    carbs: 350,
    fat: 80
  }
];

const sampleSleepData = [
  {
    date: '2024-03-15',
    hours: 7.5,
    quality: 'Good'
  }
];

export default function FitnessPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Calculate averages for the week
  const weeklyAverages = {
    workouts: {
      count: 4,
      duration: 65,
      calories: 420
    },
    nutrition: {
      calories: 2750,
      protein: 175,
      carbs: 340,
      fat: 75
    },
    sleep: {
      duration: 7.2,
      quality: 82,
      deepSleep: 2.0,
      remSleep: 1.6
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fitness Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
            className="px-4 py-2 text-sm font-medium rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
          >
            Previous Day
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-4 py-2 text-sm font-medium rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
            className="px-4 py-2 text-sm font-medium rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
          >
            Next Day
          </button>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardCard title="Weekly Workouts">
            <div className="p-4 space-y-2">
              <div className="flex items-center">
                <FiActivity className="text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyAverages.workouts.count}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Average {weeklyAverages.workouts.duration} minutes</p>
              <p className="text-gray-600 dark:text-gray-400">{weeklyAverages.workouts.calories} calories burned</p>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DashboardCard title="Weekly Nutrition">
            <div className="p-4 space-y-2">
              <div className="flex items-center">
                <FiHeart className="text-red-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyAverages.nutrition.calories}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Protein: {weeklyAverages.nutrition.protein}g</p>
              <p className="text-gray-600 dark:text-gray-400">Carbs: {weeklyAverages.nutrition.carbs}g</p>
              <p className="text-gray-600 dark:text-gray-400">Fat: {weeklyAverages.nutrition.fat}g</p>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DashboardCard title="Weekly Sleep">
            <div className="p-4 space-y-2">
              <div className="flex items-center">
                <FiMoon className="text-indigo-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyAverages.sleep.duration}h</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Quality: {weeklyAverages.sleep.quality}%</p>
              <p className="text-gray-600 dark:text-gray-400">Deep: {weeklyAverages.sleep.deepSleep}h</p>
              <p className="text-gray-600 dark:text-gray-400">REM: {weeklyAverages.sleep.remSleep}h</p>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DashboardCard title="Progress">
            <div className="p-4 space-y-2">
              <div className="flex items-center">
                <FiTrendingUp className="text-green-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">+2.5kg</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Bench Press</p>
              <p className="text-gray-600 dark:text-gray-400">+5kg Squats</p>
              <p className="text-gray-600 dark:text-gray-400">+7.5kg Deadlifts</p>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Daily Trackers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <DashboardCard title="Workout Log">
            <WorkoutLog workouts={sampleWorkouts} />
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <DashboardCard title="Nutrition Tracker">
            <NutritionTracker data={sampleNutritionData} />
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <DashboardCard title="Sleep Tracker">
            <SleepTracker data={sampleSleepData} />
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
} 