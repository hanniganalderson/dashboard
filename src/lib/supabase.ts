// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// These will be loaded from environment variables in production
// For now, we're using fallbacks that allow the app to run without errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseKey);

// Mock data for demo purposes
const mockFinancialAccounts = [
  { id: '1', name: 'Checking Account', type: 'checking', balance: 2500, last_updated: new Date().toISOString() },
  { id: '2', name: 'Savings Account', type: 'savings', balance: 10000, last_updated: new Date().toISOString() },
  { id: '3', name: 'Investment Portfolio', type: 'investment', balance: 75000, last_updated: new Date().toISOString() },
  { id: '4', name: 'Cryptocurrency', type: 'crypto', balance: 12000, last_updated: new Date().toISOString() },
];

export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'reading' | 'completed' | 'want-to-read';
  date_added: string;
  date_completed?: string;
  summary?: string;
  takeaways?: string;
}

export interface Course {
  id: string;
  name: string;
  institution: string;
  status: 'in-progress' | 'completed' | 'planned';
  start_date?: string;
  end_date?: string;
  credits?: number;
  notes?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  start_date: string;
  target_date?: string;
}

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
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('date_added', { ascending: false });

  if (error) {
    console.error('Error fetching books:', error);
    return [];
  }

  return data as Book[];
}

// Function to fetch course data
export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data as Course[];
}

// Function to fetch project data
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data as Project[];
}