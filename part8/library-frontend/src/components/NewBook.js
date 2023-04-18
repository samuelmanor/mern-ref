import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { ADD_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')

  const [ addBook ] = useMutation(ADD_BOOK);

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published: Number(published), genres: genre } });

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genre
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook