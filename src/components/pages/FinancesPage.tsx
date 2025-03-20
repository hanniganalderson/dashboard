'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiEye, FiEyeOff, FiCreditCard, FiShield } from 'react-icons/fi';
import DashboardCard from '@/components/dashboard/DashboardCard';
import NetWorthChart from '@/components/finances/NetWorthChart';
import AssetAllocation from '@/components/finances/AssetAllocation';
import CreditScore from '@/components/finances/CreditScore';
import { getFinancialAccounts } from '@/lib/supabase';

// Define types for our financial data
interface FinancialAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  last_updated: string;
}

export default function FinancesPage() {
  const [isPrivate, setIsPrivate] = useState(false);
  const [accounts, setAccounts] = useState<FinancialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch financial accounts data
  useEffect(() => {
    async function fetchAccounts() {
      setIsLoading(true);
      try {
        const accountData = await getFinancialAccounts();
        setAccounts(accountData);
      } catch (error) {
        console.error('Error fetching accounts:', error);
        // Set some sample data if fetch fails
        setAccounts([
          { id: '1', name: 'Schwab Checking', type: 'checking', balance: 4280, last_updated: new Date().toISOString() },
          { id: '2', name: 'Schwab Investment', type: 'investment', balance: 28650, last_updated: new Date().toISOString() },
          { id: '3', name: 'Coinbase', type: 'crypto', balance: 12350, last_updated: new Date().toISOString() },
          { id: '4', name: 'River', type: 'crypto', balance: 9000, last_updated: new Date().toISOString() },
          { id: '5', name: 'First Interstate', type: 'savings', balance: 15000, last_updated: new Date().toISOString() }
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAccounts();
  }, []);

  // Calculate totals by account type
  const calculateTotals = () => {
    const totals = {
      checking: 0,
      savings: 0,
      investment: 0,
      crypto: 0,
      total: 0
    };

    accounts.forEach(account => {
      totals[account.type as keyof typeof totals] += account.balance;
      totals.total += account.balance;
    });

    return totals;
  };

  const totals = calculateTotals();

  // Sample chart data for net worth over time
  const netWorthHistory = [
    { month: 'Jan', value: 58000 },
    { month: 'Feb', value: 59200 },
    { month: 'Mar', value: 61500 },
    { month: 'Apr', value: 62100 },
    { month: 'May', value: 64300 },
    { month: 'Jun', value: 65800 },
    { month: 'Jul', value: 67200 },
    { month: 'Aug', value: 68400 },
    { month: 'Sep', value: 69280 },
  ];

  // Sample asset allocation data
  const assetAllocation = [
    { name: 'Cash', value: totals.checking + totals.savings },
    { name: 'Investments', value: totals.investment },
    { name: 'Crypto', value: totals.crypto }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Dashboard</h1>
        <button
          onClick={() => setIsPrivate(!isPrivate)}
          className="px-4 py-2 text-sm font-medium rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
        >
          {isPrivate ? 'Show Values' : 'Hide Values'}
        </button>
      </div>

      {/* Net Worth Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <DashboardCard title="Net Worth Trend">
            <div className="h-80">
              <NetWorthChart data={netWorthHistory} isPrivate={isPrivate} />
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DashboardCard title="Asset Allocation">
            <div className="h-80">
              <AssetAllocation data={assetAllocation} isPrivate={isPrivate} />
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Accounts List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <DashboardCard title="Accounts Overview">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Balance</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                  {accounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{account.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">{account.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                        {isPrivate ? '•••••' : `$${account.balance.toLocaleString()}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500 dark:text-gray-400">
                        {new Date(account.last_updated).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 dark:bg-gray-800 font-medium">
                    <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Total</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                      {isPrivate ? '•••••' : `$${totals.total.toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </DashboardCard>
      </motion.div>

      {/* Additional Financial Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DashboardCard title="Credit Score">
            <div className="h-64 flex items-center justify-center">
              <CreditScore score={755} isPrivate={isPrivate} />
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <DashboardCard title="Financial Aid Planning">
            <div className="p-4 space-y-4">
              <div className="flex items-center">
                <FiShield className="text-blue-500 mr-3 text-xl" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">FAFSA Status</h4>
                  <p className="text-gray-600 dark:text-gray-400">Submitted on October 5, 2024</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiDollarSign className="text-green-500 mr-3 text-xl" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Scholarships</h4>
                  <p className="text-gray-600 dark:text-gray-400">2 active scholarships totaling {isPrivate ? '•••••' : '$12,500'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiCreditCard className="text-purple-500 mr-3 text-xl" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Student Loans</h4>
                  <p className="text-gray-600 dark:text-gray-400">Current balance: {isPrivate ? '•••••' : '$18,200'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiTrendingUp className="text-orange-500 mr-3 text-xl" />
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Estimated Graduation Cost</h4>
                  <p className="text-gray-600 dark:text-gray-400">Remaining: {isPrivate ? '•••••' : '$24,800'}</p>
                </div>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      </div>
    </div>
  );
} 