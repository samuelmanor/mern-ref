import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        upvote(state, action) {
            const id = action.payload;
            const toUpdate = state.find(a => a.id === id);
            const updatedAnecdote = { ...toUpdate, votes: toUpdate.votes + 1 };

            return state.map(a => a.id !== id ? a : updatedAnecdote);
        },
        setAnecdotes(state, action) {
            return action.payload;
        }
    }
});

export const { appendAnecdote, upvote, setAnecdotes} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(anecdotes));
    };
};

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(appendAnecdote(newAnecdote));
    };
};

export default anecdoteSlice.reducer;