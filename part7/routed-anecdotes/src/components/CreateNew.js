import { useState } from 'react';

const CreateNew = ({ addNew, useNavigate }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');

  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault()
    addNew({
      content,
      author,
      info,
      votes: 0
    });
    navigate('/');
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={event => setContent(event.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={event => setInfo(event.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;