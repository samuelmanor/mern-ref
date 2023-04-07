import { useState } from 'react';

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
      likes: 0
    };
    handleCreateBlog(blogObject);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <form onSubmit={handleBlog}>
        <h3>add blog:</h3>
                title:
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)} />
                author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)} />
                url:
        <input
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)} />
        <button type='submit'>post</button>
      </form>
    </div>
  );
};

export default BlogForm;