import { createSlice } from "@reduxjs/toolkit";

const initialState: Stats = {
  workoutStats: {
    totalWorkouts: 0,
    totalWorkoutTime: 0,
    totalWeightLifted: [],
    avgReps: 0,
    avgWeight: 0,
    mostFrequentExercise: "",
    personalBest: {
      exercise: "",
      weight: 0,
      reps: 0,
    },
  },
  macroStats: {
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    avgCalories: 0,
    avgProtein: 0,
    avgCarbs: 0,
    avgFat: 0,
    mostEatenFood: "",
  },
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setWorkoutStats: (state, action) => {
      state.workoutStats = action.payload;
    },

    setMacroStats: (state, action) => {
      state.macroStats = action.payload;
    },
  },
});

export const { setWorkoutStats, setMacroStats } = statsSlice.actions;
export default statsSlice.reducer;
