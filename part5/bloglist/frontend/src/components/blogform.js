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
          id='title-input'
          onChange={({ target }) => setTitle(target.value)} />
                author:
        <input
          type='text'
          value={author}
          id='author-input'
          onChange={({ target }) => setAuthor(target.value)} />
                url:
        <input
          type='text'
          value={url}
          id='url-input'
          onChange={({ target }) => setUrl(target.value)} />
        <button id='post-blog-btn' type='submit'>post</button>
      </form>
    </div>
  );
};

export default BlogForm;