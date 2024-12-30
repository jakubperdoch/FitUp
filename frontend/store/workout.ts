import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WorkoutState {
  id: number | null;
  isActive: boolean;
}

const initialState: WorkoutState = {
  id: null,
  isActive: false,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<number>) => {
      state.isActive = true;
      state.id = action.payload;
    },
    setInactive: (state) => {
      state.isActive = false;
      state.id = null;
    },
  },
});

export const { setActive, setInactive } = workoutSlice.actions;

export default workoutSlice.reducer;
