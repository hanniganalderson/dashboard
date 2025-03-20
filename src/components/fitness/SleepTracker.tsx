// src/components/fitness/SleepTracker.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiMoon, FiSun, FiTrendingUp } from 'react-icons/fi';

interface SleepDay {
  date: string;
  hours: number;
  quality: string;
}

interface SleepTrackerProps {
  data: SleepDay[];
}

export default function SleepTracker({ data }: SleepTrackerProps) {
  // Format the data for the chart
  const chartData = data.map(day => ({
    name: new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' }),
    hours: day.hours,
    quality: day.quality
  })).reverse(); // Show oldest to newest from left to right

  // Calculate sleep stats
  const averageSleep = data.reduce((sum, day) => sum + day.hours, 0) / data.length;
  const bestSleep = Math.max(...data.map(day => day.hours));
  const worstSleep = Math.min(...data.map(day => day.hours));

  // Get quality score
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'Excellent':
        return 'text-green-500';
      case 'Good':
        return 'text-blue-500';
      case 'Fair':
        return 'text-yellow-500';
      case 'Poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  // Get sleep quality distribution
  const qualityDistribution = {
    Excellent: data.filter(day => day.quality === 'Excellent').length,
    Good: data.filter(day => day.quality === 'Good').length,
    Fair: data.filter(day => day.quality === 'Fair').length,
    Poor: data.filter(day => day.quality === 'Poor').length,
  };

  return (
    <div className="space-y-6">
      {/* Sleep duration chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} hours`, 'Sleep']}
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                color: '#F9FAFB'
              }}
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              activeDot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sleep stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center">
          <div className="mr-3 p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            <FiMoon className="text-indigo-500 text-lg" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Average</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{averageSleep.toFixed(1)}h</p>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center">
          <div className="mr-3 p-2 bg-green-100 dark:bg-green-900 rounded-full">
            <FiTrendingUp className="text-green-500 text-lg" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Best</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{bestSleep.toFixed(1)}h</p>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex items-center">
          <div className="mr-3 p-2 bg-red-100 dark:bg-red-900 rounded-full">
            <FiSun className="text-red-500 text-lg" />
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Worst</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{worstSleep.toFixed(1)}h</p>
          </div>
        </div>
      </div>

      {/* Quality distribution */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sleep Quality</h4>
        <div className="flex space-x-2">
          {/* Excellent quality indicator */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center">
            <div className={`text-xl font-bold ${getQualityColor('Excellent')}`}>
              {qualityDistribution.Excellent}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Excellent</div>
          </div>
          
          {/* Good quality indicator */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center">
            <div className={`text-xl font-bold ${getQualityColor('Good')}`}>
              {qualityDistribution.Good}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Good</div>
          </div>
          
          {/* Fair quality indicator */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center">
            <div className={`text-xl font-bold ${getQualityColor('Fair')}`}>
              {qualityDistribution.Fair}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Fair</div>
          </div>
          
          {/* Poor quality indicator */}
          <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-center">
            <div className={`text-xl font-bold ${getQualityColor('Poor')}`}>
              {qualityDistribution.Poor}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Poor</div>
          </div>
        </div>
      </div>
    </div>
  );
}