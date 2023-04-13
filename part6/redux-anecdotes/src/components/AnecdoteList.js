import { useDispatch, useSelector } from 'react-redux';
import { upvoteAnecdote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    );
};

const Anecdotes = ({ filters }) => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => {
        return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()));
    });
    
    return (
        <div>
            {anecdotes.map(anecdote => 
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => dispatch(upvoteAnecdote(anecdote))} />
            )}
        </div>
    );
};

export default Anecdotes;