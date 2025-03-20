'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGitBranch, FiClock, FiCheckCircle, FiAlertCircle, FiList, FiPauseCircle, FiTrendingUp } from 'react-icons/fi';
import DashboardCard from '@/components/dashboard/DashboardCard';
import ProjectCard from '@/components/projects/ProjectCard';
import GoalTracker from '@/components/projects/GoalTracker';
import { getProjects } from '@/lib/supabase';

// Define types for our project data
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  start_date: string;
  target_date?: string;
  tasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects data
  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      try {
        const projectData = await getProjects();
        setProjects(projectData);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Set some sample data if fetch fails
        setProjects([
          {
            id: '1',
            name: 'Personal Dashboard',
            description: 'A comprehensive dashboard for tracking personal metrics and goals',
            status: 'in-progress',
            progress: 75,
            start_date: '2024-01-01',
            target_date: '2024-04-01',
            tasks: [
              { id: '1', title: 'Design UI components', completed: true },
              { id: '2', title: 'Implement data fetching', completed: true },
              { id: '3', title: 'Add authentication', completed: false },
              { id: '4', title: 'Deploy to production', completed: false }
            ]
          },
          {
            id: '2',
            name: 'Fitness Tracker',
            description: 'Mobile app for tracking workouts and nutrition',
            status: 'completed',
            progress: 100,
            start_date: '2023-12-01',
            target_date: '2024-03-15',
            tasks: [
              { id: '1', title: 'Design UI/UX', completed: true },
              { id: '2', title: 'Build core features', completed: true },
              { id: '3', title: 'Test and debug', completed: true },
              { id: '4', title: 'App store submission', completed: true }
            ]
          },
          {
            id: '3',
            name: 'Portfolio Website',
            description: 'Personal portfolio website with project showcase',
            status: 'on-hold',
            progress: 30,
            start_date: '2024-02-01',
            target_date: '2024-05-01',
            tasks: [
              { id: '1', title: 'Design layout', completed: true },
              { id: '2', title: 'Create components', completed: false },
              { id: '3', title: 'Add content', completed: false },
              { id: '4', title: 'Optimize performance', completed: false }
            ]
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Calculate project statistics
  const projectStats = {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    completed: projects.filter(p => p.status === 'completed').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
    averageProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  };

  // Sample goal data
  const sampleGoal = {
    name: 'Complete 3 Projects',
    progress: 66,
    target: 3,
    current: 2
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects Dashboard</h1>
        <button
          className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors"
        >
          New Project
        </button>
      </div>

      {/* Project Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardCard title="Total Projects">
            <div className="p-4 space-y-2">
              <div className="flex items-center">
                <FiGitBranch className="text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{projectStats.total}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Active and completed</p>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DashboardCard title="In Progress">
            <div className="p-4 space-y-2">
              <div className="flex items-center">
                <FiClock className="text-yellow-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{projectStats.inProgress}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Currently active</p>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DashboardCard title="Completed">
            <div className="p-4 space-y-2">
              <div className="flex items-center">
                <FiCheckCircle className="text-green-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{projectStats.completed}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Successfully finished</p>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DashboardCard title="On Hold">
            <div className="p-4 space-y-2">
              <div className="flex items-center">
                <FiAlertCircle className="text-red-500 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{projectStats.onHold}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">Paused or blocked</p>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Project List and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <DashboardCard title="Project List">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </DashboardCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <DashboardCard title="Project Goals">
            <GoalTracker goal={sampleGoal} />
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
} 