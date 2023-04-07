import { useState } from "react";

const Blog = ({ blog, handleUpdate, user, handleDelete }) => {
    const [showInfo, setShowInfo] = useState(false);

    const toggleShow = () => {
        setShowInfo(!showInfo)
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

    return (
        <div>
            {blog.title} - {blog.author}
            <button onClick={toggleShow}>view</button>
            <div style={{ display: showInfo ? '' : 'none' }}>
                <p>{blog.url}</p>
                <p>likes: {blog.likes}</p> <button onClick={addLike}>like</button>
                <p>posted by {blog.user.username}</p>
            </div>
            {user.username === blog.user.username ? <button onClick={() => handleDelete(blog.id)}>delete blog</button>: null}
        </div>
    );
};

export default Blog;