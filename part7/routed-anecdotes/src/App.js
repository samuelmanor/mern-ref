import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, useParams, Link, useNavigate
} from 'react-router-dom';

import About from './components/About';
import Footer from './components/Footer';
import AnecdoteList from './components/AnecdoteList';
import Anecdote from './components/Anecdote';
import CreateNew from './components/CreateNew';
import Menu from './components/Menu';
import Notification from './components/Notification';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notif, setNotif] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    showNotif(anecdote.content);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
    const padding = {
    paddingRight: 5
  }

  const showNotif = (content) => {
    setNotif(`created ${content}`);
    setTimeout(() => setNotif(''), 5000);
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
        <Notification message={notif} />
        <Router>
          <Menu />
          <Routes>
            <Route path='/' element={<AnecdoteList anecdotes={anecdotes} Link={Link} />} />
            <Route path='/:id' element={<Anecdote useParams={useParams} anecdotes={anecdotes} />} />
            <Route path='/create' element={<CreateNew addNew={addNew} useNavigate={useNavigate} />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Router>
      <Footer />
    </div>
  )
}

export default App