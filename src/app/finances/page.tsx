'use client';

import { useState, useEffect } from 'react';
import { FiDollarSign, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import { getFinancialAccounts } from '@/lib/supabase';
import DashboardCard from '@/components/dashboard/DashboardCard';
import StatCard from '@/components/dashboard/StatCard';
import ProgressBar from '@/components/dashboard/ProgressBar';

// Define types for financial data
interface FinancialAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  last_updated: string;
}

export default function FinancesPage() {
  const [accounts, setAccounts] = useState<FinancialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  // Fetch accounts data
  useEffect(() => {
    async function fetchAccounts() {
      setIsLoading(true);
      try {
        const data = await getFinancialAccounts();
        setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts:', error);
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
      if (totals[account.type as keyof typeof totals] !== undefined) {
        totals[account.type as keyof typeof totals] += account.balance;
      }
      totals.total += account.balance;
    });

    return totals;
  };

  const totals = calculateTotals();

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

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Net Worth"
          value={isPrivate ? '•••••' : `$${totals.total.toLocaleString()}`}
          icon={<FiDollarSign className="text-blue-500 text-2xl" />}
        />
        <StatCard
          title="Investments"
          value={isPrivate ? '•••••' : `$${totals.investment.toLocaleString()}`}
          icon={<FiTrendingUp className="text-green-500 text-2xl" />}
        />
        <StatCard
          title="Savings"
          value={isPrivate ? '•••••' : `$${totals.savings.toLocaleString()}`}
          icon={<FiPieChart className="text-purple-500 text-2xl" />}
        />
      </div>

      {/* Accounts Table */}
      <DashboardCard title="Accounts Overview">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
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

      {/* Savings Goal */}
      <DashboardCard title="Savings Goal">
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Emergency Fund</h3>
            <ProgressBar 
              progress={75} 
              label="Goal: $15,000" 
              colorClass="bg-blue-500"
            />
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Vacation Fund</h3>
            <ProgressBar 
              progress={40} 
              label="Goal: $5,000" 
              colorClass="bg-green-500"
            />
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}