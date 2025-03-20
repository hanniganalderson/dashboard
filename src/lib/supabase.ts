// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// These will be loaded from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to fetch financial accounts data
export async function getFinancialAccounts() {
  const { data, error } = await supabase
    .from('financial_accounts')
    .select('*')
    .order('last_updated', { ascending: false });
  
  if (error) {
    console.error('Error fetching financial accounts:', error);
    return [];
  }
  
  return data;
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
  
  return data;
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
  
  return data;
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
  
  return data;
}

// Test function to verify connection
export async function testConnection() {
  const { data, error } = await supabase.from('financial_accounts').select('count').single();
  
  if (error) {
    console.error('Error connecting to Supabase:', error);
    return false;
  }
  
  return true;
}