const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        title: 'lorem ipsum',
        author: 'jeff tool',
        url: 'hi',
        likes: 10
    },
    {
        title: 'example blog',
        author: 'jeff tool',
        url: 'hello',
        likes: 3
    }
];

const nonExistingId = async () => {
    const blog = new Blog({ author: 'jeff tool' });
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
};