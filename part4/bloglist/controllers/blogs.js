const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(400).end();
    }
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;

    const user = await User.findById(body.userId);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes,
        user: user.id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true});
    
    if (updatedBlog) {
        response.status(201).json(updatedBlog.toJSON());
    } else {
        response.status(404).end();
    };
});

module.exports = blogsRouter;