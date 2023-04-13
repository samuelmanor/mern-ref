import { useState } from 'react';

const CreateNew = props => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = event => {
    event.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    });
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