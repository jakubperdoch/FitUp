import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<WorkoutDetails> = {};

export const exercisesSlice = createSlice({
  name: "workoutCreation",
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<Exercise[]>) => {
      state.exercises = action.payload;
    },
    addSuperset: (state, action: PayloadAction<Superset>) => {
      state.exercises.push(action.payload);
    },
    removeExercise: (state, action: PayloadAction<number>) => {
      state.exercises.splice(action.payload, 1);
    },
    addSet: (
      state,
      action: PayloadAction<{ exerciseIndex: number; supersetIndex?: number }>,
    ) => {
      if (action.payload.supersetIndex !== undefined) {
        const superset = state.exercises[
          action.payload.exerciseIndex
        ] as Superset;
        if (
          superset.exercises[action.payload.supersetIndex].sets === undefined
        ) {
          superset.exercises[action.payload.supersetIndex].sets = [];
        }

        superset.exercises[action.payload.supersetIndex].sets.push({});
      } else {
        const exercise = state.exercises[
          action.payload.exerciseIndex
        ] as Exercise;

        if (exercise.sets === undefined) {
          exercise.sets = [];
        }
        exercise.sets.push({});
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
        const superset = state.exercises[
          action.payload.exerciseIndex
        ] as Superset;
        superset.exercises[action.payload.supersetIndex].sets.splice(
          action.payload.setIndex,
          1,
        );
      } else {
        const exercise = state.exercises[
          action.payload.exerciseIndex
        ] as Exercise;
        exercise.sets.splice(action.payload.setIndex, 1);
      }
    },

    resetExercises: (state) => {
      return initialState;
    },
  },
});

export const {
  setExercises,
  addSuperset,
  removeExercise,
  addSet,
  removeSet,
  resetExercises,
} = exercisesSlice.actions;
export default exercisesSlice.reducer;
