import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorkoutState {
  workout: Partial<WorkoutDetails>;
}

const initialState: WorkoutState = {
  workout: {
    exercises: [],
    days: [],
  },
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setWorkoutPlan: (state, action: PayloadAction<WorkoutDetails>) => {
      state.workout = {
        ...action.payload,
        timer: 0,
      };
    },

    clearWorkoutPlan: (state) => {
      state.workout = {
        exercises: [],
      };
    },

    setExercises: (state, action: PayloadAction<Exercise[]>) => {
      if (!state.workout?.exercises) {
        state.workout.exercises = [];
      }
      state.workout.exercises.push(...action.payload);
    },

    addSuperset: (state, action: PayloadAction<Superset>) => {
      if (!state.workout?.exercises) {
        state.workout.exercises = [];
      }
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
        special_type?: string;
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

        set.special_type = action.payload.special_type ?? set.special_type;
      } else {
        const exercise = state.workout.exercises[
          action.payload.exerciseIndex
        ] as Exercise;

        const set = exercise?.sets[action.payload.setIndex];

        set.special_type = action.payload.special_type ?? set.special_type;
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
  setWorkoutPlan,
  clearWorkoutPlan,
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
