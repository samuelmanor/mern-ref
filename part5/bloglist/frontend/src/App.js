import { useState, useEffect, useRef } from 'react';
import Blog from './components/blog';
import BlogForm from './components/blogform';
import LoginForm from './components/loginForm';
import Notification from './components/notification';
import Togglable from './components/togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notif, setNotif] = useState('');

  const [user, setUser] = useState(null);

  const formRef = useRef();

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

  const handleLogin = async (info) => {    
    try {
      const user = await loginService.login(info);

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      handleNotif('wrong username or password', 'warning');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    setUser(null);
  };

  const handleCreateBlog = (obj) => {
    formRef.current.toggleVisibility();
    blogService.create(obj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));

        handleNotif(`added '${obj.title}' by ${obj.author}`, 'created');
      });
  };

  const handleUpdate = async (obj) => {
    const updatedBlog = await blogService.update(obj.id, obj);
    if (updatedBlog) {
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog));
    };
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

  const blogMap = blogs.map(blog => <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} />);

  return (
    <div>
      <Notification message={notif} />
      {user === null
        ? <Togglable buttonLabel='log in'>
            <LoginForm login={handleLogin} />
          </Togglable>
        : <div><p>{user.name} logged in</p><button onClick={handleLogout}>log out</button></div>}

      <h2>blogs</h2>
      {user === null
        ? null
        : <Togglable buttonLabel='new blog' ref={formRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>}
      {blogMap}
    </div>
  );
};

export default App;