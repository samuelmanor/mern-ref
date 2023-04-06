import { useState, useEffect } from 'react';
import Blog from './components/blog';
import Notification from './components/notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notif, setNotif] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs => {setBlogs(blogs)});
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [blogs]);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      handleNotif('wrong username or password', 'warning');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
      likes: 0
    };

    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setTitle('');
        setAuthor('');
        setUrl('');

        handleNotif(`added ${blogObject.title} by ${blogObject.author}`, 'created');
      });
  };

  const handleNotif = (message, type) => {
    setNotif({
      message: message,
      type: type
    });

    setTimeout(() => {
      setNotif(null);
    }, 5000);
  };

  const loginForm = (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const createBlogForm = (
    <form onSubmit={handleCreateBlog}>
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
  );

  const blogMap = blogs.map(blog => <Blog key={blog.id} blog={blog} />);

  return (
    <div>
      <Notification message={notif} />
      {user === null
        ? loginForm
        : <div><p>{user.name} logged in</p><button onClick={handleLogout}>log out</button></div>}

      <h2>blogs</h2>
      {user === null 
        ? null 
        : <div>{createBlogForm}{blogMap}</div>}
    </div>
  );
};

export default App;