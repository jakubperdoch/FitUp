import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import workoutReducer from "./workout";

export const store = configureStore({
  reducer: {
    user: userReducer,
    workout: workoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
