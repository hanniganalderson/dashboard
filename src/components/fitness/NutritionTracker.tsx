// src/components/fitness/NutritionTracker.tsx
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface NutritionDay {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionTrackerProps {
  data: NutritionDay[];
}

export default function NutritionTracker({ data }: NutritionTrackerProps) {
  // Format the data for the chart
  const chartData = data.map(day => ({
    name: new Date(day.date).toLocaleDateString(undefined, { weekday: 'short' }),
    calories: day.calories,
    protein: day.protein,
    carbs: day.carbs,
    fat: day.fat
  })).reverse(); // Show oldest to newest from left to right

  // Calculate daily averages
  const averages = {
    calories: Math.round(data.reduce((sum, day) => sum + day.calories, 0) / data.length),
    protein: Math.round(data.reduce((sum, day) => sum + day.protein, 0) / data.length),
    carbs: Math.round(data.reduce((sum, day) => sum + day.carbs, 0) / data.length),
    fat: Math.round(data.reduce((sum, day) => sum + day.fat, 0) / data.length)
  };

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                color: '#F9FAFB'
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar dataKey="calories" fill="#3B82F6" name="Calories" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Nutrition breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Protein</h4>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{averages.protein}g</p>
          <p className="text-xs text-blue-600 dark:text-blue-500">Daily Average</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Carbs</h4>
          <p className="text-2xl font-bold text-green-700 dark:text-green-400">{averages.carbs}g</p>
          <p className="text-xs text-green-600 dark:text-green-500">Daily Average</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Fat</h4>
          <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{averages.fat}g</p>
          <p className="text-xs text-yellow-600 dark:text-yellow-500">Daily Average</p>
        </div>
      </div>

      {/* Calorie goal */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Daily Calorie Target</span>
          <span className="font-medium text-gray-900 dark:text-white">{averages.calories} / 2400</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full bg-blue-500" 
            style={{ width: `${Math.min((averages.calories / 2400) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}