const Anecdote = ({ anecdotes, useParams }) => {
    const id = useParams().id;
    const anecdote = anecdotes.find(a => a.id === Number(id));
    
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <h3>{anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}</h3>
        </div>
    );
};

export default Anecdote;