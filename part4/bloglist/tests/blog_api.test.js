const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
});

describe('blog api', () => {
    test('notes returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'lorem ipsum',
            author: 'jeff tool',
            url: 'hello',
            likes: 15
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const contents = blogsAtEnd.map(b => b.title);
        expect(contents).toContain('lorem ipsum');
    });

    // test('blog without author is not added', async () => {           <---- timeout?
    //     const newBlog = {
    //         title: 'lorem ipsum',
    //         url: 'hello',
    //         likes: 15
    //     };

    //     await api
    //         .post('/api/blogs')
    //         .send(newBlog)
    //         .expect(400);

    //     const blogsAtEnd = await helper.blogsInDb();
    //     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    // });

    test('a specific blog can be viewed', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToView = blogsAtStart[0];

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        
        expect(resultBlog.body).toEqual(blogToView);
    });

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

        const contents = blogsAtEnd.map(r => r.title);
        expect(contents).not.toContain(blogToDelete.content);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});