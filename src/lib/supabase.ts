// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// These will be loaded from environment variables in production
// For now, we're using fallbacks that allow the app to run without errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy_key';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for demo purposes
const mockFinancialAccounts = [
  { id: '1', name: 'Checking Account', type: 'checking', balance: 2500, last_updated: new Date().toISOString() },
  { id: '2', name: 'Savings Account', type: 'savings', balance: 10000, last_updated: new Date().toISOString() },
  { id: '3', name: 'Investment Portfolio', type: 'investment', balance: 75000, last_updated: new Date().toISOString() },
  { id: '4', name: 'Cryptocurrency', type: 'crypto', balance: 12000, last_updated: new Date().toISOString() },
];

const mockBooks = [
  { 
    id: '1', 
    title: 'Atomic Habits', 
    author: 'James Clear', 
    status: 'completed', 
    date_added: '2023-09-01',
    date_completed: '2023-10-15',
    summary: 'A guide about building good habits and breaking bad ones.'
  },
  { 
    id: '2', 
    title: 'Deep Work', 
    author: 'Cal Newport', 
    status: 'completed', 
    date_added: '2023-11-01',
    date_completed: '2023-12-10',
    summary: 'Rules for focused success in a distracted world.'
  },
  { 
    id: '3', 
    title: 'The Psychology of Money', 
    author: 'Morgan Housel', 
    status: 'reading', 
    date_added: '2024-01-15',
    summary: 'Timeless lessons on wealth, greed, and happiness.'
  }
];

const mockProjects = [
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
      { id: '3', title: 'Add authentication', completed: false }
    ]
  },
  {
    id: '2',
    name: 'Fitness App',
    description: 'Mobile application for tracking workouts and nutrition',
    status: 'completed',
    progress: 100,
    start_date: '2023-08-01',
    target_date: '2023-11-01',
    tasks: [
      { id: '1', title: 'Design UI/UX', completed: true },
      { id: '2', title: 'Implement core features', completed: true },
      { id: '3', title: 'Beta testing', completed: true }
    ]
  }
];

// Function to fetch financial accounts data
export async function getFinancialAccounts() {
  try {
    // First try to get data from Supabase
    const { data, error } = await supabase
      .from('financial_accounts')
      .select('*');
    
    if (error || !data || data.length === 0) {
      // If there's an error or no data, return mock data
      return mockFinancialAccounts;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching financial accounts:', error);
    // Return mock data as fallback
    return mockFinancialAccounts;
  }
}

// Function to fetch book data
export async function getBooks() {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*');
    
    if (error || !data || data.length === 0) {
      return mockBooks;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return mockBooks;
  }
}

// Function to fetch project data
export async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*');
    
    if (error || !data || data.length === 0) {
      return mockProjects;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return mockProjects;
  }
}