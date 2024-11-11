import React from 'react';
import { Heart } from 'lucide-react';
import type { ResultsProps } from '../types';

const Results: React.FC<ResultsProps> = ({ bmiData }) => {
  if (!bmiData) return null;

  const getBMIColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'underweight':
        return 'text-yellow-600';
      case 'normal':
        return 'text-green-600';
      case 'overweight':
        return 'text-orange-600';
      case 'obese':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-800">Your Results</h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Current Weight</div>
          <div className="text-2xl font-bold text-indigo-600">
            {bmiData.weight} kg
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Your BMI</div>
          <div className="text-2xl font-bold text-indigo-600">{bmiData.bmi.toFixed(1)}</div>
          <div className={`text-sm font-medium ${getBMIColor(bmiData.category)}`}>
            {bmiData.category}
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Ideal Weight Range</div>
          <div className="text-2xl font-bold text-green-600">
            {bmiData.idealRange.min.toFixed(1)} - {bmiData.idealRange.max.toFixed(1)} kg
          </div>
          <div className="text-sm text-gray-500">
            Based on your {bmiData.profile} profile
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Recommended Weight Change</div>
          <div className="text-2xl font-bold text-indigo-600">
            {Math.abs(bmiData.weightChange).toFixed(1)} kg
          </div>
          <div className="text-sm text-gray-500">
            Aim to {bmiData.weightChange > 0 ? 'gain' : 'lose'} 0.5-1 kg per week
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;