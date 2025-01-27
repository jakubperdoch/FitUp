interface totalWeightLifted {
  label: number;
  value: number;
}

interface WorkoutStats {
  totalWorkouts: number;
  totalWorkoutTime: number;
  totalWeightLifted: totalWeightLifted[];
  avgReps: number;
  avgWeight: number;
  mostFrequentExercise: string;
  personalBest: {
    exercise: string;
    weight: number;
    reps: number;
  };
}

interface MacroStats {
  totalCalories: number;
  mostFrequentMeal: string;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    sugar: number;
    fiber: number;
  };
}

interface Stats {
  workoutStats: WorkoutStats;
  macroStats: MacroStats;
}
