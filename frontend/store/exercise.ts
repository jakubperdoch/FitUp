import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Array<Exercise | Superset> = [];

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<Exercise[]>) => {
      return action.payload;
    },
    addSuperset: (state, action: PayloadAction<Superset>) => {
      state.push(action.payload);
    },
    removeExercise: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    addSet: (
      state,
      action: PayloadAction<{ exerciseIndex: number; supersetIndex?: number }>,
    ) => {
      if (action.payload.supersetIndex !== undefined) {
        const superset = state[action.payload.exerciseIndex] as Superset;
        if (
          superset.exercises[action.payload.supersetIndex].sets === undefined
        ) {
          superset.exercises[action.payload.supersetIndex].sets = [];
        }

        superset.exercises[action.payload.supersetIndex].sets.push({});
      } else {
        const exercise = state[action.payload.exerciseIndex] as Exercise;

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
        const superset = state[action.payload.exerciseIndex] as Superset;
        const set =
          superset.exercises[action.payload.superSetIndex].sets[
            action.payload.setIndex
          ];
        set.reps = action.payload.repsValue ?? set.reps;
        set.weight = action.payload.weightValue ?? set.weight;
      } else {
        const exercise = state[action.payload.exerciseIndex] as Exercise;
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
        const superset = state[action.payload.exerciseIndex] as Superset;
        superset.exercises[action.payload.supersetIndex].sets.splice(
          action.payload.setIndex,
          1,
        );
      } else {
        const exercise = state[action.payload.exerciseIndex] as Exercise;
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
  resetExercises,
  addSuperset,
  removeExercise,
  addSet,
  updateSet,
  removeSet,
} = exercisesSlice.actions;
export default exercisesSlice.reducer;
