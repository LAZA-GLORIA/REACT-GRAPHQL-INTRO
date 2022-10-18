import "reflect-metadata";
import { buildSchema } from "type-graphql";

const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID
    title: String
    author: String
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    getBookById(bookId: ID): Book
  }
`;

const books = [
    {
      id: 0,
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id: 1,
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
// const resolvers = {
//     Query: {
//       books: () => books,
//     },
//   };

  const getBookById = (_: any, args: { bookId: any; }) => books.find((book) => book.id == args.bookId)

//   Mutation: {
//     addBook: (_, args) => {
//       const lastId = books.at(-1).id;
//       const newId = lastId + 1;
//       books.push({
//         title: args.title,
//         author: args.author,
//         id: newId,
//       });
//       return books.at(-1);
//     },
//   },

  const {
    ApolloServerPluginLandingPageLocalDefault
  } = require('apollo-server-core');
  
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    getBookById,
    csrfPrevention: true,
    cache: 'bounded',
    /**
     * What's up with this embed: true option?
     * These are our recommended settings for using AS;
     * they aren't the defaults in AS3 for backwards-compatibility reasons but
     * will be the defaults in AS4. For production environments, use
     * ApolloServerPluginLandingPageProductionDefault instead.
    **/
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  
  // The `listen` method launches a web server.
  //un objet que je desctructure donc le type a la forme d'un objet
  server.listen().then(({ url }: {url: string}) => {
    console.log(`🚀  Server ready at ${ url }`);
  });