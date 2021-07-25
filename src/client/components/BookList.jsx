import _ from "lodash";
import React, { useState } from "react";
import {
  gql,
  useQuery
} from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const { data, error, loading } = useQuery(getBooksQuery);
  const [ selectedBookId, setSelectedBookId ] = useState();
  if (loading) return <p>Loading Books...</p>
  if (error) return <p>Error: Could not load books right now</p>
  return (
    <div>
      <ul className="book-list">
        {
          _.map(data.books, book => <li key={book.id} onClick={() => setSelectedBookId(book.id)}>{book.title}</li>)
        }
      </ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
}

export default BookList;