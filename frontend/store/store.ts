import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import workoutReducer from "./workout";
import statsReducer from "./stats";

export const store = configureStore({
  reducer: {
    user: userReducer,
    workout: workoutReducer,
    stats: statsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
