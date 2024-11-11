import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';
import Calculator from './components/Calculator';
import Results from './components/Results';
import HealthTips from './components/HealthTips';
import type { BMIData } from './types';

function App() {
  const [bmiData, setBmiData] = useState<BMIData | null>(null);

  const calculateBMI = (height: number, weight: number, profile: string, unit: string) => {
    // Convert imperial to metric if needed
    if (unit === 'imperial') {
      height = height * 2.54; // inches to cm
      weight = weight * 0.453592; // lbs to kg
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    // Calculate ideal weight range (BMI 18.5-24.9)
    const idealMin = 18.5 * heightInMeters * heightInMeters;
    const idealMax = 24.9 * heightInMeters * heightInMeters;

    // Adjust ranges based on profile
    let adjustedMin = idealMin;
    let adjustedMax = idealMax;

    switch (profile) {
      case 'athlete':
        adjustedMin *= 1.1;
        adjustedMax *= 1.1;
        break;
      case 'senior':
        adjustedMin *= 0.95;
        adjustedMax *= 0.95;
        break;
      case 'diabetic':
        adjustedMax *= 0.95;
        break;
    }

    const targetWeight = weight > adjustedMax ? adjustedMax : 
                        weight < adjustedMin ? adjustedMin : weight;
    const weightChange = targetWeight - weight;

    setBmiData({
      weight,
      bmi,
      category,
      idealRange: {
        min: adjustedMin,
        max: adjustedMax
      },
      weightChange,
      profile
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CalcIcon className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Health Weight Calculator</h1>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-emerald-600 text-lg font-medium">
              Discover the power of balance with our free Health Weight Calculator application! This innovative tool is designed to help you take control of your health and wellness journey, whether you're managing diabetes, focusing on fitness, addressing obesity, or simply aiming for overall better health.
            </p>
            <div className="prose prose-emerald mx-auto text-left">
              <p className="text-emerald-600">
                Our user-friendly calculator provides personalized insights into your ideal weight range, body mass index (BMI), and daily caloric needs. By inputting basic information such as your height, weight, age, and activity level, you'll receive tailored recommendations to help you achieve and maintain a healthy lifestyle.
              </p>
              <p className="text-emerald-600">
                For individuals with diabetes, the Health Weight Calculator offers valuable guidance on weight management, which is crucial for blood sugar control. Fitness enthusiasts can use it to track progress and set realistic goals. Those struggling with obesity will find it an essential tool for planning a sustainable weight loss strategy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-600">
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">Diabetes</h3>
                  <p className="text-emerald-700">Aids in weight management for better blood sugar control</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-600">
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">Fitness</h3>
                  <p className="text-emerald-700">Helps set realistic goals and track progress</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-600">
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">Obesity</h3>
                  <p className="text-emerald-700">Provides a starting point for sustainable weight loss</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-600">
                  <h3 className="text-xl font-bold text-emerald-800 mb-2">General Health</h3>
                  <p className="text-emerald-700">Offers insights for maintaining a balanced lifestyle</p>
                </div>
              </div>
              <p className="text-center font-medium text-gray-900">
                Take the first step towards a healthier you – try our free Health Weight Calculator today and start your journey to a more balanced, healthier lifestyle!
              </p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Calculator Column */}
          <div>
            <Calculator onCalculate={calculateBMI} />
          </div>

          {/* Results and Health Tips Column */}
          <div>
            {bmiData && (
              <div className="space-y-6">
                <Results bmiData={bmiData} />
                <HealthTips category={bmiData.category} profile={bmiData.profile} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;