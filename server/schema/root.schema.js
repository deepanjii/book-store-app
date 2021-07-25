const _ = require("lodash");
const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require("graphql");

const books = [
  {id: "1", title: "The Power of your subconscious mind", genre: "Self-help", authorId: "1"},
  {id: "2", title: "Learn and Earn", genre: "Business & Economics", authorId: "2"},
  {id: "3", title: "One Up on Wall Street", genre: "Business & Economics", authorId: "2"},
  {id: "4", title: "Rich dad and Poor dad", genre: "Personal Finance", authorId: "3"},
  {id: "5", title: "Refactoring UI", genre: "Technical", authorId: "4"}
];

const authors = [
  {id: "1", name: "Joseph Murphy", country: "Ireland"},
  {id: "2", name: "Peter Lynch", country: "United States"},
  {id: "3", name: "Robert Kiyosaki", country: "United States"},
  {id: "4", name: "Steve Schoger", country: "Canada"}
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(_parent, _args) {
        return _.find(authors, {id: _parent.authorId});
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
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {id: { type: GraphQLID }},
      resolve(_parent, args) {
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: { type: GraphQLID }},
      resolve(_parent, args) {
        return _.find(authors, {id: args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(_parent, _args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(_parent, _args) {
        return authors;
      }
    }
  }
});

const rootSchema = new GraphQLSchema({
  query: RootQuery
});

module.exports = { rootSchema };