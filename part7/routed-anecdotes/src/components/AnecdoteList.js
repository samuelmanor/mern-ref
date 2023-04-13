// import Anecdote from "./Anecdote";

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>{anecdote.content}
        <br />
        {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}
        </li>
      ))}
    </ul>
  </div>
);

export default AnecdoteList;