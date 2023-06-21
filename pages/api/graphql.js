import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

let books = [
  {
    id: 0,
    name: "JavaScript for Dummies",
  },
];

const typeDefs = gql`
  type Book {
    id: ID!
    name: String
  }
  type Query {
    getBooks: [Book]
  }
`;

const resolvers = {
  Query: {
    getBooks: () => {
      return books;
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
