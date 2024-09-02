import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	fullName: string;
	email: string;
	password: string;
	gender: string;
	birthDate: string;
	weight: number;
	height: number;
	goal: string;
}

const initialState: UserState = {
	fullName: '',
	email: '',
	password: '',
	gender: '',
	birthDate: '',
	weight: 0,
	height: 0,
	goal: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setFullName: (state, action: PayloadAction<string>) => {
			state.fullName = action.payload;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setGender: (state, action: PayloadAction<string>) => {
			state.gender = action.payload;
		},
		setBirthDate: (state, action: PayloadAction<string>) => {
			state.birthDate = action.payload;
		},
		setWeight: (state, action: PayloadAction<number>) => {
			state.weight = action.payload;
		},
		setHeight: (state, action: PayloadAction<number>) => {
			state.height = action.payload;
		},
		setGoal: (state, action: PayloadAction<string>) => {
			state.goal = action.payload;
		},
	},
});

export const { setFullName, setEmail, setPassword, setGender, setBirthDate, setWeight, setHeight, setGoal } = userSlice.actions;

export default userSlice.reducer;
