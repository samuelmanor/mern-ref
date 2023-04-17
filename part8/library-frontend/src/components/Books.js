import { gql, useQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

import { ALL_BOOKS } from '../queries';

const Books = (props) => {
  const [books, setBooks] = useState([]);

  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (!result.loading) {
      setBooks(result.data.allBooks);
    }
  });

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books