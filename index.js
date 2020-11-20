const { ApolloServer, gql } = require('apollo-server')
const fetch  = require('node-fetch')

const typeDefs = gql`
  type Query {
    books: [Book]
    book(title: String): Book
    character: StarWarsCharacter

  }

  type Book {
    title: String
    author: String
  }

  type StarWarsCharacter {
    name: String
    height: String
  }

`
const books = [
  {
    title: 'Twylight',
    author: 'Tyler Ipson',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const getStarWarsCharacter = () => {
  return fetch("https://swapi.dev/api/people/1/")
  .then(res => res.json())

}

const resolvers = {
  Query: {
    books: () => books,
    book: (_, args) => books.find(book => book.title.toLowerCase() === args.title.toLowerCase()),
    character: getStarWarsCharacter
  }
}

const server = new ApolloServer({typeDefs, resolvers})
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});