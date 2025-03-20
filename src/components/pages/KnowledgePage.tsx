'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiSearch, FiBookmark, FiEdit3, FiCheckCircle } from 'react-icons/fi';
import DashboardCard from '@/components/dashboard/DashboardCard';
import Bookshelf from '@/components/knowledge/Bookshelf';
import CourseTracker from '@/components/knowledge/CourseTracker';
import { getBooks, getCourses } from '@/lib/supabase';

// Define types for our data
interface Book {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'completed' | 'want-to-read';
  date_added: string;
  date_completed?: string;
  summary?: string;
  takeaways?: string;
}

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

export default function KnowledgePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('books');

  // Fetch books and courses data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch books
        const booksData = await getBooks();
        if (booksData.length > 0) {
          setBooks(booksData);
        } else {
          // Set sample data if no books found
          setBooks([
            { 
              id: '1', 
              title: 'Atomic Habits', 
              author: 'James Clear', 
              status: 'completed', 
              date_added: '2023-09-01',
              date_completed: '2023-10-15',
              summary: 'A guide about building good habits and breaking bad ones.',
              takeaways: 'Small changes compound over time. Focus on systems rather than goals.'
            },
            { 
              id: '2', 
              title: 'Deep Work', 
              author: 'Cal Newport', 
              status: 'completed', 
              date_added: '2023-11-01',
              date_completed: '2023-12-10',
              summary: 'Rules for focused success in a distracted world.',
              takeaways: 'Schedule deep work blocks. Embrace boredom. Quit social media.'
            },
            { 
              id: '3', 
              title: 'The Psychology of Money', 
              author: 'Morgan Housel', 
              status: 'reading', 
              date_added: '2024-01-15',
              summary: 'Timeless lessons on wealth, greed, and happiness.'
            },
            { 
              id: '4', 
              title: 'Thinking, Fast and Slow', 
              author: 'Daniel Kahneman', 
              status: 'want-to-read', 
              date_added: '2024-02-20'
            },
            { 
              id: '5', 
              title: 'The Design of Everyday Things', 
              author: 'Don Norman', 
              status: 'want-to-read', 
              date_added: '2024-03-10'
            }
          ]);
        }

        // Fetch courses
        const coursesData = await getCourses();
        if (coursesData.length > 0) {
          setCourses(coursesData);
        } else {
          // Set sample data if no courses found
          setCourses([
            {
              id: '1',
              name: 'CS 101: Introduction to Computer Science',
              institution: 'State University',
              status: 'completed',
              start_date: '2023-09-01',
              end_date: '2023-12-15',
              credits: 4,
              notes: 'Great introduction to programming fundamentals. Final project was building a simple web app.'
            },
            {
              id: '2',
              name: 'MATH 203: Linear Algebra',
              institution: 'State University',
              status: 'completed',
              start_date: '2023-09-01',
              end_date: '2023-12-15',
              credits: 3,
              notes: 'Challenging but fascinating. Applications in computer graphics and machine learning.'
            },
            {
              id: '3',
              name: 'CS 212: Data Structures',
              institution: 'State University',
              status: 'in-progress',
              start_date: '2024-01-10',
              credits: 4
            },
            {
              id: '4',
              name: 'PHIL 105: Critical Thinking',
              institution: 'State University',
              status: 'in-progress',
              start_date: '2024-01-10',
              credits: 3
            },
            {
              id: '5',
              name: 'CS 301: Algorithms',
              institution: 'State University',
              status: 'planned',
              start_date: '2024-09-01',
              credits: 4
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching knowledge data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter books and courses based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count books by status
  const bookCounts = {
    reading: books.filter(book => book.status === 'reading').length,
    completed: books.filter(book => book.status === 'completed').length,
    wantToRead: books.filter(book => book.status === 'want-to-read').length,
    total: books.length
  };

  // Count courses by status
  const courseCounts = {
    inProgress: courses.filter(course => course.status === 'in-progress').length,
    completed: courses.filter(course => course.status === 'completed').length,
    planned: courses.filter(course => course.status === 'planned').length,
    total: courses.length,
    currentCredits: courses
      .filter(course => course.status === 'in-progress')
      .reduce((sum, course) => sum + (course.credits || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Knowledge Base</h1>
        
        {/* Search bar */}
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white dark:bg-gray-800 h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full text-gray-900 dark:text-white"
            placeholder="Search books & courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardCard title="Reading Stats">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <FiBook className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{bookCounts.total}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Total Books</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                  <FiCheckCircle className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{bookCounts.completed}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Completed</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                  <FiEdit3 className="text-purple-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{bookCounts.reading}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Reading Now</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-4">
                  <FiBookmark className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{bookCounts.wantToRead}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Want to Read</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DashboardCard title="Course Stats">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <FiBook className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{courseCounts.total}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Total Courses</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-4">
                  <FiCheckCircle className="text-green-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{courseCounts.completed}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Completed</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                  <FiEdit3 className="text-purple-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{courseCounts.inProgress}</h3>
                  <p className="text-gray-500 dark:text-gray-400">In Progress</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex items-center">
                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-4">
                  <FiBookmark className="text-yellow-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{courseCounts.currentCredits}</h3>
                  <p className="text-gray-500 dark:text-gray-400">Current Credits</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <DashboardCard title="Bookshelf">
            <Bookshelf books={filteredBooks} />
          </DashboardCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <DashboardCard title="Course Tracker">
            <CourseTracker courses={filteredCourses} />
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
} 