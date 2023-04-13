// import Anecdote from "./Anecdote";

const AnecdoteList = ({ anecdotes, Link }) => {
    const mapped = anecdotes.map(a => {
        return (
            <li key={a.id}>
                <Link to={`/${a.id}`}>{a.content}</Link>
                {a.votes} {a.votes === 1 ? 'vote' : 'votes'}
            </li>
        );
    });

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                {mapped}
            </ul>
      </div>
    )
}

export default AnecdoteList;