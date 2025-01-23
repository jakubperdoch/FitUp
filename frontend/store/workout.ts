import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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

    // updateSet: (
    //     state,
    //     action: PayloadAction<{
    //       exerciseIndex: number;
    //       setIndex: number;
    //       superSetIndex: number;
    //       repsValue?: number;
    //       weightValue?: number;
    //     }>,
    // ) => {
    //   if (action.payload.superSetIndex !== undefined) {
    //     const superset = state.exercises[
    //         action.payload.exerciseIndex
    //         ] as Superset;
    //     const set =
    //         superset.exercises[action.payload.superSetIndex].sets[
    //             action.payload.setIndex
    //             ];
    //     set.reps = action.payload.repsValue ?? set.reps;
    //     set.weight = action.payload.weightValue ?? set.weight;
    //   } else {
    //     const exercise = state.exercises[
    //         action.payload.exerciseIndex
    //         ] as Exercise;
    //     const set = exercise.sets[action.payload.setIndex];
    //     set.reps = action.payload.repsValue ?? set.reps;
    //     set.weight = action.payload.weightValue ?? set.weight;
    //   }
    // },

    setTimer: (state, action: PayloadAction<boolean>) => {
      state.isTimerActive = action.payload;
    },
  },
});

export const { setWorkout, clearWorkout, updateTimer, setTimer } =
  workoutSlice.actions;
export default workoutSlice.reducer;
