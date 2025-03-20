'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiDollarSign, FiActivity, FiBook, FiTarget } from 'react-icons/fi';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold mb-4">Personal Dashboard</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400">Your life metrics in one place</p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants}>
          <Link href="/finances" className="block">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                  <FiDollarSign className="text-blue-500 dark:text-blue-400 text-2xl" />
                </div>
                <h2 className="text-2xl font-semibold">Finances</h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400">Track investments, net worth, and financial goals</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/fitness" className="block">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                  <FiActivity className="text-green-500 dark:text-green-400 text-2xl" />
                </div>
                <h2 className="text-2xl font-semibold">Fitness</h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400">Monitor workouts, nutrition, and wellness data</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/knowledge" className="block">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-4">
                  <FiBook className="text-purple-500 dark:text-purple-400 text-2xl" />
                </div>
                <h2 className="text-2xl font-semibold">Knowledge</h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400">Track books, courses, and learning progress</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/projects" className="block">
            <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors h-full">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4">
                  <FiTarget className="text-red-500 dark:text-red-400 text-2xl" />
                </div>
                <h2 className="text-2xl font-semibold">Projects</h2>
              </div>
              <p className="text-gray-500 dark:text-gray-400">Manage personal projects and track goals</p>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}