import { useState, useEffect, useRef } from 'react';
import Blog from './components/blog';
import BlogForm from './components/blogform';
import Notification from './components/notification';
import Togglable from './components/togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notif, setNotif] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

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

  const handleCreateBlog = (obj) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(obj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));

        handleNotif(`added '${obj.title}' by ${obj.author}`, 'created');
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
        : <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>}
      {blogMap}
    </div>
  );
};

export default App;