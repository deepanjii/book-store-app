const _ = require("lodash");
const {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull
} = require("graphql");

const Author = require("../models/author.model");
const Book = require("../models/book.model");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, _args) {
        return Author.findById({_id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, _args) {
        return Book.find({authorId: parent.id});
      }
    }
  })
});

const BookStoreQuery = new GraphQLObjectType({
  name: "BookStoreQueryType",
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLString }},
      resolve(_parent, args) {
        return Book.findById({_id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: { type: GraphQLString }},
      resolve(_parent, args) {
        return Author.findById({_id: args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(_parent, _args) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(_parent, _args) {
        return Author.find({});
      }
    }
  }
});

const bookStoreMutation = new GraphQLObjectType({
  name: "BookStoreMutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(_parent, args) {
        const author = new Author({
          name: args.name,
          country: args.country
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_parent, args) {
        const book = new Book({
          title: args.title,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
})

const dbRootSchema = new GraphQLSchema({
  query: BookStoreQuery,
  mutation: bookStoreMutation
});

module.exports = { dbRootSchema };