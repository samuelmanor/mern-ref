// import { useSelector, useDispatch } from 'react-redux'
import Anecdotes from './components/Anecdotes'

const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App