import { useState } from 'react';

const Blog = ({ blog, handleUpdate, user, handleDelete }) => {
  const [showInfo, setShowInfo] = useState(false);

  const showDelete = () => {
    if (user) {
        return (<button onClick={() => handleDelete(blog.id)}>delete blog</button>)
    } else {
        return null
    }
  };

  const toggleShow = () => {
    setShowInfo(!showInfo);
  };

  const addLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    };
    handleUpdate(updatedBlog);
  };

  const blogInfo = (
    <div>
        <p>{blog.url}</p>
        <p>likes: {blog.likes}</p> <button onClick={addLike}>like</button>
        <p>posted by {blog.user.username}</p>
    </div>
  );

  return (
    <div className='blog'>
      {blog.title} - {blog.author}

      <button id='view-btn' onClick={toggleShow}>view</button>

      {showInfo ? blogInfo : null}

      {showDelete()}
    </div>
  );
};

export default Blog;