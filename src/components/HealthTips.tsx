import React from 'react';
import type { HealthTipsProps } from '../types';

const HealthTips: React.FC<HealthTipsProps> = ({ category, profile }) => {
  const getTips = () => {
    const tips = {
      general: {
        underweight: [
          'Eat nutrient-rich foods',
          'Include protein in every meal',
          'Add healthy snacks between meals',
          'Consider strength training',
        ],
        normal: [
          'Maintain a balanced diet',
          'Regular exercise',
          'Stay hydrated',
          'Get adequate sleep',
        ],
        overweight: [
          'Focus on portion control',
          'Increase physical activity',
          'Choose whole foods',
          'Track your meals',
        ],
        obese: [
          'Consult a healthcare provider',
          'Start with walking daily',
          'Reduce processed foods',
          'Join a support group',
        ],
      },
      diabetic: {
        all: [
          'Monitor blood sugar regularly',
          'Time meals appropriately',
          'Choose low glycemic foods',
          'Stay active with doctor approval',
        ],
      },
      athlete: {
        all: [
          'Focus on lean protein intake',
          'Time nutrition around workouts',
          'Stay properly hydrated',
          'Get adequate rest between training',
        ],
      },
      senior: {
        all: [
          'Focus on nutrient-dense foods',
          'Stay hydrated',
          'Maintain muscle with protein',
          'Regular gentle exercise',
        ],
      },
    };

    if (profile !== 'general') {
      return tips[profile as keyof typeof tips].all;
    }

    return tips.general[category.toLowerCase() as keyof typeof tips.general];
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Personalized Health Tips
      </h2>
      <ul className="space-y-2">
        {getTips().map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-indigo-600">•</span>
            <span className="text-gray-700">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthTips;