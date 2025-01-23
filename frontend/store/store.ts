import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import workoutReducer from "./workout";
import exerciseReducer from "./workoutCreation";

export const store = configureStore({
  reducer: {
    user: userReducer,
    workout: workoutReducer,
    workoutCreation: exerciseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
