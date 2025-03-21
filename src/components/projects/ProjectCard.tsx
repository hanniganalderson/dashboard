// src/components/projects/ProjectCard.tsx
'use client';

import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiAlertCircle, FiCheckCircle, FiPauseCircle, FiPlayCircle } from 'react-icons/fi';

interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  start_date: string;
  target_date?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // Get status badge details
  const getStatusDetails = (status: string) => {
    switch (status) {
      case 'not-started':
        return { 
          label: 'Not Started', 
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          icon: <FiClock className="mr-1" />
        };
      case 'in-progress':
        return { 
          label: 'In Progress', 
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
          icon: <FiPlayCircle className="mr-1" />
        };
      case 'completed':
        return { 
          label: 'Completed', 
          color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          icon: <FiCheckCircle className="mr-1" />
        };
      case 'on-hold':
        return { 
          label: 'On Hold', 
          color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
          icon: <FiPauseCircle className="mr-1" />
        };
      default:
        return { 
          label: status, 
          color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          icon: null 
        };
    }
  };

  const statusDetails = getStatusDetails(project.status);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {project.description}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusDetails.color}`}>
              {statusDetails.icon}
              {statusDetails.label}
            </span>
            {project.start_date && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                <FiCalendar className="mr-1" />
                Started: {new Date(project.start_date).toLocaleDateString()}
              </span>
            )}
            {project.target_date && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                <FiCalendar className="mr-1" />
                Due: {new Date(project.target_date).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
          <div className="relative h-16 w-16">
            <svg className="transform -rotate-90 h-16 w-16">
              <circle
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="28"
                cx="32"
                cy="32"
              />
              <circle
                className="text-blue-500"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="28"
                cx="32"
                cy="32"
                strokeDasharray={`${project.progress * 1.76} 176`}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {project.progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;