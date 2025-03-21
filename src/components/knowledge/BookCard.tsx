// src/components/knowledge/BookCard.tsx
'use client';

import { motion } from 'framer-motion';
import { FiBook, FiCalendar, FiUser, FiChevronDown, FiChevronUp } from 'react-icons/fi';

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

interface BookCardProps {
  book: Book;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const BookCard = ({ book, isExpanded, onToggleExpand }: BookCardProps) => {
  // Determine status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'reading':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'want-to-read':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {book.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {book.author}
          </p>
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <FiCalendar className="mr-1" />
              {new Date(book.date_added).toLocaleDateString()}
            </span>
            <span className={`text-sm px-2 py-1 rounded-full ${getStatusBadge(book.status)}`}>
              {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
            </span>
          </div>
        </div>
        <button
          onClick={onToggleExpand}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {isExpanded && (book.summary || book.takeaways) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          {book.summary && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Summary</h4>
              <p className="text-gray-600 dark:text-gray-400">{book.summary}</p>
            </div>
          )}
          {book.takeaways && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Takeaways</h4>
              <p className="text-gray-600 dark:text-gray-400">{book.takeaways}</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookCard;