import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotif(state, action) {
            return action.payload;
        }
    }
});

export const { setNotif } = notificationSlice.actions;
export default notificationSlice.reducer;