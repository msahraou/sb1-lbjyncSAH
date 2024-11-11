import React, { useState } from 'react';
import type { CalculatorProps } from '../types';

const Calculator: React.FC<CalculatorProps> = ({ onCalculate }) => {
  const [meters, setMeters] = useState('');
  const [centimeters, setCentimeters] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [profile, setProfile] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalHeight = unit === 'metric' 
      ? (Number(meters) * 100) + Number(centimeters)
      : (Number(feet) * 12) + Number(inches); // Convert feet to inches and add additional inches
    onCalculate(totalHeight, Number(weight), profile, unit);
  };

  const renderHeightInput = () => {
    if (unit === 'metric') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Height (metres)
            </label>
            <input
              type="number"
              value={meters}
              onChange={(e) => setMeters(e.target.value)}
              min="0"
              max="3"
              step="0.01"
              placeholder="1.75"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional centimeters
            </label>
            <input
              type="number"
              value={centimeters}
              onChange={(e) => setCentimeters(e.target.value)}
              min="0"
              max="99"
              placeholder="0"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (feet)
          </label>
          <input
            type="number"
            value={feet}
            onChange={(e) => setFeet(e.target.value)}
            min="0"
            max="8"
            placeholder="5"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional inches
          </label>
          <input
            type="number"
            value={inches}
            onChange={(e) => setInches(e.target.value)}
            min="0"
            max="11"
            placeholder="10"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <div className="text-xl font-semibold text-gray-800">Input Your Details</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 mb-4">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded ${
              unit === 'metric'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => {
              setUnit('metric');
              setMeters('');
              setCentimeters('');
              setFeet('');
              setInches('');
            }}
          >
            Metric (m/cm/kg)
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded ${
              unit === 'imperial'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => {
              setUnit('imperial');
              setMeters('');
              setCentimeters('');
              setFeet('');
              setInches('');
            }}
          >
            Imperial (ft/in/lbs)
          </button>
        </div>

        {renderHeightInput()}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Health Profile
          </label>
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
          >
            <option value="general">General</option>
            <option value="diabetic">Diabetic</option>
            <option value="athlete">Athlete</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default Calculator;