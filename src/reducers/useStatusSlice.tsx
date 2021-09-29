import { createSlice } from '@reduxjs/toolkit';

type StatusState = {
	status: string;
};

const initialState: StatusState = {
	status: 'inactive',
};

const userStatusSlice = createSlice({
	name: 'status',
	initialState,
	reducers: {
		setStatus: (state: StatusState, action) => {
			state.status = action.payload;
		},
	},
});

export const { setStatus } = userStatusSlice.actions;

export default userStatusSlice.reducer;
