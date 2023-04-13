import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotif } from '../reducers/notificationReducer';

const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';

        dispatch(createAnecdote(content));

        dispatch(setNotif(`created ${content}`, 5));
    };

    return (
        <form onSubmit={addAnecdote}>
            <input name='anecdote' />
            <button type='submit'>create</button>
        </form>
    );
};

export default NewAnecdote;