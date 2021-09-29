import { createSlice } from '@reduxjs/toolkit';

type LoaderState = {
	loading: boolean;
};

const initialState: LoaderState = {
	loading: false,
};

const loaderSlice = createSlice({
	name: 'loader',
	initialState,
	reducers: {
		showLoading: (state: LoaderState) => {
			state.loading = true;
		},
		hideLoading: (state: LoaderState) => {
			state.loading = false;
		},
	},
});

export const { showLoading, hideLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
