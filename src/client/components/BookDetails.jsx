import { useQuery } from "@apollo/client";
import React from "react";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({ bookId }) => {
  if (!bookId) return <div className="book-details-container">No book selected. Select a book to fetch its info.</div>

  const { data, error, loading } = useQuery(getBookQuery, {
    variables: {id: bookId}
  });
  if (loading) return <div className="book-details-container">Loading book details...</div>
  if (error) return <div className="book-details-container">Oops could not fetch book details !</div>
  return (
    <div className="book-details-container">
      <h2>{data.book.title}</h2>
      <p>{data.book.genre}</p>
      <p>{`${data.book.author.name}, ${data.book.author.country}`}</p>
      <p>All books by author</p>
      <ul>
        {
          data.book.author.books.map(book => <li key={book.id}>{book.title}</li>)
        }
      </ul>
    </div>
  );
};

export default BookDetails;