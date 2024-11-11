export interface BMIData {
  weight: number;
  bmi: number;
  category: string;
  idealRange: {
    min: number;
    max: number;
  };
  weightChange: number;
  profile: string;
}

export interface CalculatorProps {
  onCalculate: (height: number, weight: number, profile: string, unit: string) => void;
}

export interface ResultsProps {
  bmiData: BMIData | null;
}

export interface HealthTipsProps {
  category: string;
  profile: string;
}