import { gql, useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries';

const Authors = (props) => {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState(0);

  const result = useQuery(ALL_AUTHORS);

  const [ editAuthor ] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  useEffect(() => {
    if (!result.loading) {
      setAuthors(result.data.allAuthors);
    }
  }, [result]);

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: Number(year) } });

    setName('');
    setYear(0);
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <h2>set birthyear</h2>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option value='def'>-</option>
          {authors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <br />
        born:
        <input type='number' value={year} onChange={({ target }) => setYear(target.value)} />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors