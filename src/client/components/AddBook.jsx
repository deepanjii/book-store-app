import React, { useState } from "react";
import {
  useMutation,
  useQuery
} from "@apollo/client";
import { addBookQuery, getAuthorsQuery, getBooksQuery } from "../queries/queries";

const getAuthors = () => {
  const { data, error, loading } = useQuery(getAuthorsQuery);
  if (loading) return <option>Loading Authors...</option>
  if (error) return <option>No Authors available...</option>

  return (
    _.map(data.authors, author => <option key={author.id} value={author.id}>{author.name}</option>)
  );
}

const AddBook = () => {
  const [bookName, setBookName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addBook, { data }] = useMutation(addBookQuery);

  const addBookAction  = (e) => {
    e.preventDefault();
    console.log(addBook);
    addBook({
      variables: {title: bookName, genre: genre, authorId: authorId},
      refetchQueries: [{ query: getBooksQuery }]
    }).then(data => console.log(data)).catch(err => console.log(err));
  }

  return (
    <div className="add-book-form-container">
      <div className="add-book-form">
        <div className="field">
          <label>Book Name:</label>
          <input onChange={e => setBookName(e.target.value)} type="text" />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input onChange={e => setGenre(e.target.value)} type="text" />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => setAuthorId(e.target.value)}>
            <option>Select Author</option>
            { getAuthors() }
          </select>
        </div>
        <div className="add-book-btn" onClick={addBookAction}>Add Book</div>
      </div>
    </div>
  )
}

export default AddBook;