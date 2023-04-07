import { useState } from "react";

const Blog = ({ blog }) => {
    const [showInfo, setShowInfo] = useState(false);

    const toggleShow = () => {
        setShowInfo(!showInfo)
    }

    return (
        <div>
            {blog.title} - {blog.author}
            <button onClick={toggleShow}>view</button>
            <div style={{ display: showInfo ? '' : 'none' }}>
                <p>{blog.url}</p>
                <p>likes: {blog.likes}</p> <button>like</button>
                <p>posted by {blog.user.username}</p>
            </div>
        </div>
    );
};

export default Blog;