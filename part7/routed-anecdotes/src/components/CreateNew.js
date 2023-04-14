import { useField } from '../hooks';

const CreateNew = ({ addNew, useNavigate }) => {
  const navigate = useNavigate();

  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

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

  const resetFields = (event) => {
    event.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input { ...content } />
        </div>
        <div>
          author
          <input { ...author } />
        </div>
        <div>
          url for more info
          <input { ...info } />
        </div>
        <button type='submit'>create</button>
        <button onClick={resetFields}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;