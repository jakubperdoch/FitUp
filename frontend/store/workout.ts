import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorkoutState {
  workout: Partial<WorkoutDetails>;
  isTimerActive: boolean;
}

const initialState: WorkoutState = {
  workout: {
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

    setExercises: (state, action: PayloadAction<Exercise[]>) => {
      if (!state.workout?.exercises) {
        state.workout.exercises = [];
      }
      state.workout.exercises = action.payload;
    },

    addSuperset: (state, action: PayloadAction<Superset>) => {
      state.workout.exercises.push(action.payload);
    },

    removeExercise: (state, action: PayloadAction<number>) => {
      state.workout.exercises.splice(action.payload, 1);
    },

    resetExercises: (state) => {
      return initialState;
    },

    addDays: (state, action: PayloadAction<string[]>) => {
      if (state.workout.days === undefined) {
        state.workout.days = [];
      }

      state.workout.days = action.payload;
    },

    addName: (state, action: PayloadAction<string>) => {
      if (state.workout.name === undefined) {
        state.workout.name = "";
      }
      state.workout.name = action.payload;
    },

    addSet: (
      state,
      action: PayloadAction<{ exerciseIndex: number; supersetIndex?: number }>,
    ) => {
      if (action.payload.supersetIndex !== undefined) {
        const superset = state.workout.exercises[
          action.payload.exerciseIndex
        ] as Superset;
        if (
          superset.exercises[action.payload.supersetIndex].sets === undefined
        ) {
          superset.exercises[action.payload.supersetIndex].sets = [];
        }

        superset.exercises[action.payload.supersetIndex].sets.push({});
      } else {
        const exercise = state.workout.exercises[
          action.payload.exerciseIndex
        ] as Exercise;

        if (exercise.sets === undefined) {
          exercise.sets = [];
        }
        exercise.sets.push({});
      }
    },

    updateSet: (
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
          superset.exercises[action.payload.superSetIndex].sets[
            action.payload.setIndex
          ];

        set.reps = action.payload.repsValue ?? set.reps;
        set.weight = action.payload.weightValue ?? set.weight;
      } else {
        const exercise = state.workout.exercises[
          action.payload.exerciseIndex
        ] as Exercise;

        const set = exercise.sets[action.payload.setIndex];

        set.reps = action.payload.repsValue ?? set.reps;
        set.weight = action.payload.weightValue ?? set.weight;
      }
    },

    removeSet: (
      state,
      action: PayloadAction<{
        exerciseIndex: number;
        setIndex: number;
        supersetIndex?: number;
      }>,
    ) => {
      if (action.payload.supersetIndex !== undefined) {
        const superset = state.workout.exercises[
          action.payload.exerciseIndex
        ] as Superset;
        superset.exercises[action.payload.supersetIndex].sets.splice(
          action.payload.setIndex,
          1,
        );
      } else {
        const exercise = state.workout.exercises[
          action.payload.exerciseIndex
        ] as Exercise;
        exercise.sets.splice(action.payload.setIndex, 1);
      }
    },
  },
});

export const {
  setWorkout,
  clearWorkout,
  updateTimer,
  setTimer,
  setExercises,
  addSuperset,
  removeExercise,
  addSet,
  removeSet,
  updateSet,
  resetExercises,
  addDays,
  addName,
} = workoutSlice.actions;
export default workoutSlice.reducer;
