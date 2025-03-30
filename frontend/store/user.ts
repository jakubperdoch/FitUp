import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<User> = {
  userCredentials: {
    fullName: "",
    email: "",
    password: "",
  },
  userBiometrics: {
    birthDate: "",
    weight: 0,
    height: 0,
  },
  gender: "",
  goal: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFullName: (state, action: PayloadAction<string>) => {
      state.userCredentials.fullName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.userCredentials.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.userCredentials.password = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setBirthDate: (state, action: PayloadAction<string>) => {
      state.userBiometrics.birthDate = action.payload;
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.userBiometrics.weight = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.userBiometrics.height = action.payload;
    },
    setGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  setFullName,
  setEmail,
  setPassword,
  setGender,
  setBirthDate,
  setWeight,
  setHeight,
  setGoal,
  setUser,
  setToken,
} = userSlice.actions;

export default userSlice.reducer;
