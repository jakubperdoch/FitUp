import { createSlice } from "@reduxjs/toolkit";

export interface WorkoutState {
  isActive: boolean;
}

const initialState: WorkoutState = {
  isActive: false,
};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setActive: (state) => {
      state.isActive = true;
    },
    setInactive: (state) => {
      state.isActive = false;
    },
  },
});

export const { setActive, setInactive } = workoutSlice.actions;
export default workoutSlice.reducer;
