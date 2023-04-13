import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotif(state, action) {
            return action.payload;
        }
    }
});

export const { showNotif } = notificationSlice.actions;

export const setNotif = (message, time) => {
    return dispatch => {
        dispatch(showNotif(message));

        setTimeout(() => {
            dispatch(showNotif(''));
        }, time * 1000);
    };
};

export default notificationSlice.reducer;