import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks {
    allBooks {
      author
      genres
      published
      title
    }
  }
`

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author
      genres
      published
      title
    }
  }
`