import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorkoutState {
  workout: Partial<WorkoutDetails>;
  isTimerActive: boolean;
}

const initialState: WorkoutState = {
  workout: {
    days: [],
    exercises: [],
  },
  isTimerActive: false,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkout: (state, action: PayloadAction<WorkoutDetails>) => {
      state.workout = {
        ...action.payload,
        timer: 0,
      };
      state.isTimerActive = true;
    },

    clearWorkout: (state) => {
      state.workout = { timer: 0 };
      state.isTimerActive = false;
    },

    updateTimer: (state, action: PayloadAction<number>) => {
      state.workout.timer = action.payload;
    },

    setTimer: (state, action: PayloadAction<boolean>) => {
      state.isTimerActive = action.payload;
    },

    updateActiveWorkoutSet: (
      state,
      action: PayloadAction<{
        exerciseIndex: number;
        setIndex: number;
        superSetIndex: number;
        repsValue?: number;
        weightValue?: number;
      }>,
    ) => {
      if (action.payload.superSetIndex !== undefined) {
        const superset = state.workout.exercises[
          action.payload.exerciseIndex
        ] as Superset;

        const set =
          superset?.exercises[action.payload.superSetIndex].sets[
            action.payload.setIndex
          ];

        set.reps = action.payload.repsValue ?? set.reps;
        set.weight = action.payload.weightValue ?? set.weight;
      } else {
        const exercise = state.workout.exercises[
          action.payload.exerciseIndex
        ] as Exercise;

        const set = exercise?.sets[action.payload.setIndex];

        set.reps = action.payload.repsValue ?? set.reps;
        set.weight = action.payload.weightValue ?? set.weight;
      }
    },
  },
});

export const {
  setWorkout,
  clearWorkout,
  updateTimer,
  setTimer,
  updateActiveWorkoutSet,
} = workoutSlice.actions;
export default workoutSlice.reducer;
