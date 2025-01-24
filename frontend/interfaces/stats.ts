interface WorkoutStats {
  totalWorkouts: number;
  totalWorkoutTime: number;
  totalWeightLifted: number;
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
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  avgCalories: number;
  avgProtein: number;
  avgCarbs: number;
  avgFat: number;
  mostEatenFood: string;
}

interface Stats {
  workoutStats: WorkoutStats;
  macroStats: MacroStats;
}
