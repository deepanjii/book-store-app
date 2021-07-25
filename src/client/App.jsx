import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>DJ Book Store</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;