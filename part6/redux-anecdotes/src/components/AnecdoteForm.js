import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotif } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';

        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(createAnecdote(newAnecdote));

        dispatch(setNotif(`created ${content}`));
        setTimeout(() => {
            dispatch(setNotif(''));
        }, 5000);
    };

    return (
        <form onSubmit={addAnecdote}>
            <input name='anecdote' />
            <button type='submit'>create</button>
        </form>
    );
};

export default NewAnecdote;