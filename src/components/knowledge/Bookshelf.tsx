// src/components/knowledge/Bookshelf.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiCalendar, FiUser, FiCheckCircle, FiClock, FiBookmark } from 'react-icons/fi';
import BookCard from '@/components/knowledge/BookCard';

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

interface BookshelfProps {
  books: Book[];
}

const Bookshelf = ({ books }: BookshelfProps) => {
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const toggleExpand = (bookId: string) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  const filteredBooks = filter === 'all' 
    ? books
    : books.filter(book => book.status === filter);

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
          onClick={() => setFilter('reading')}
          className={`px-4 py-2 rounded-md ${
            filter === 'reading'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Reading
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
          onClick={() => setFilter('want-to-read')}
          className={`px-4 py-2 rounded-md ${
            filter === 'want-to-read'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Want to Read
        </button>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No books found with the current filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              isExpanded={expandedBook === book.id}
              onToggleExpand={() => toggleExpand(book.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookshelf;