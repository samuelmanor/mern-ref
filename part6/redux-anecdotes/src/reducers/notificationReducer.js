import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotif(state, action) {
            return action.payload;
        },
        hideNotif(state, action) {
            return null
        }
    }
});

export default notificationSlice.reducer;