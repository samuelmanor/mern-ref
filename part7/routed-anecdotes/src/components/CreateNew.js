import { useField } from '../hooks';

const CreateNew = ({ addNew, useNavigate }) => {
  const navigate = useNavigate();

  const { reset: contentReset, ...content } = useField('text');
  const { reset: authorReset, ...author } = useField('text');
  const { reset: infoReset, ...info } = useField('text');

  const handleSubmit = event => {
    event.preventDefault()

    const newAnecdote = {
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
    };

    addNew(newAnecdote);
    navigate('/');
  };

  const reset = (event) => {
    event.preventDefault();
    contentReset();
    authorReset();
    infoReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' { ...content } />
        </div>
        <div>
          author
          <input name='author' { ...author } />
        </div>
        <div>
          url for more info
          <input name='url' { ...info } />
        </div>
        <button type='submit'>create</button>
        <button onClick={reset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;