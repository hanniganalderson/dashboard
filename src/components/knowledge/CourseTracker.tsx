// src/components/knowledge/CourseTracker.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiBook, FiStar, FiCheck, FiClock, FiBookmark, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface Course {
  id: string;
  name: string;
  institution: string;
  status: 'in-progress' | 'completed' | 'planned';
  start_date?: string;
  end_date?: string;
  credits?: number;
  notes?: string;
}

interface CourseTrackerProps {
  courses: Course[];
}

const CourseTracker = ({ courses }: CourseTrackerProps) => {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const toggleExpand = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const filteredCourses = filter === 'all'
    ? courses
    : courses.filter(course => course.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${
            filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('in-progress')}
          className={`px-4 py-2 rounded-md ${
            filter === 'in-progress'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-md ${
            filter === 'completed'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('planned')}
          className={`px-4 py-2 rounded-md ${
            filter === 'planned'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Planned
        </button>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No courses found with the current filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {course.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {course.institution}
                  </p>
                  <div className="mt-2 flex items-center space-x-4">
                    {course.start_date && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <FiCalendar className="mr-1" />
                        {new Date(course.start_date).toLocaleDateString()}
                      </span>
                    )}
                    {course.credits && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <FiStar className="mr-1" />
                        {course.credits} credits
                      </span>
                    )}
                    <span className={`text-sm flex items-center ${
                      course.status === 'completed' ? 'text-green-500' :
                      course.status === 'in-progress' ? 'text-blue-500' :
                      'text-yellow-500'
                    }`}>
                      {course.status === 'completed' && <FiCheck className="mr-1" />}
                      {course.status === 'in-progress' && <FiClock className="mr-1" />}
                      {course.status === 'planned' && <FiBookmark className="mr-1" />}
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleExpand(course.id)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {expandedCourse === course.id ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>

              {expandedCourse === course.id && course.notes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <p className="text-gray-600 dark:text-gray-400">
                    {course.notes}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseTracker;