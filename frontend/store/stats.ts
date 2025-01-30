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
    mostFrequentMeal: "",
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      sugar: 0,
      fiber: 0,
    },
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
