const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs');

        const contents = response.body.map(r => r.title);
        expect(contents).toContain('lorem ipsum');
    });
})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb();

        const blogToView = blogsAtStart[0];

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(resultBlog.body).toEqual(blogToView);
    });

    test('fails with statuscode 404 if blog does not exist', async () => {
        const invalidId = '5a3d5da59070081a82a3445';

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400);
    });
});

describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'dolor sit amet',
            author: 'buck foss',
            url: 'yeah',
            likes: 5
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const contents = blogsAtEnd.map(b => b.title);
        expect(contents).toContain('dolor sit amet');
    });

    test('fails with status code 400 if data invalid', async () => {
        const newBlog = {
            title: 'dolor sit amet'
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
});

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];
    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204);
    
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

        const contents = blogsAtEnd.map(r => r.author);
        expect(contents).not.toContain(blogToDelete.title);
      });
});