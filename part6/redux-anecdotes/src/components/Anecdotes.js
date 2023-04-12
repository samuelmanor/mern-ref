import { useDispatch, useSelector } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';

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

const Anecdotes = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(state => state);
    
    return (
        <div>
            <button onClick={() => anecdotes.map(a => console.log(a))}>cl anec</button>
            {anecdotes.map(anecdote => 
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => dispatch(upvote(anecdote.id))} />
            )}
        </div>
    );
};

export default Anecdotes;