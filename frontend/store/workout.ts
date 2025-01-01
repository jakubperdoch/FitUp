import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Workout {
  id: number;
  name: string;
  day: string;
  timer: number | null;
  timeOfWorkout: number;
}

export interface WorkoutState {
  workout: Workout | null;
  isTimerActive: boolean;
}

const initialState: WorkoutState = {
  workout: null,
  isTimerActive: false,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkout: (state, action: PayloadAction<Workout>) => {
      state.workout = {
        ...action.payload,
        timer: 0,
      };
      state.isTimerActive = true;
    },
    clearWorkout: (state) => {
      state.workout = null;
      state.isTimerActive = false;
    },

    updateTimer: (state, action: PayloadAction<number>) => {
      state.workout.timer = action.payload;
    },

    setTimer: (state, action: PayloadAction<boolean>) => {
      state.isTimerActive = action.payload;
    },
  },
});

export const { setWorkout, clearWorkout, updateTimer, setTimer } =
  workoutSlice.actions;
export default workoutSlice.reducer;
