import {
  gql
} from "@apollo/client";

const getBooksQuery = gql`
  {
    books{
      id
      title
      genre
    }
  }
`;

const getBookQuery = gql`
  query($id: String!) {
    book(id: $id) {
      id
      title
      genre
      author{
        name
        country
        books{
          id
          title
        }
      }
    }
  }
`;

const getAuthorsQuery = gql`
  {
    authors{
      id
      name
    }
  }
`;

const addBookQuery = gql`
  mutation ($title: String!, $genre: String!, $authorId: String!) {
    addBook(title: $title, genre: $genre, authorId: $authorId) {
      title
      genre
      author{
        name
      }
    }
  }
`;

export { addBookQuery, getAuthorsQuery, getBookQuery, getBooksQuery };