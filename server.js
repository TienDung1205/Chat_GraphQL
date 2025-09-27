import {ApolloServer,gql} from "apollo-server";

const users = [
  {
    id: 1,
    firstName: "mukesh",
    lastName: "kumar",
    email: "mukesh@mukeshkumar.com",
    password: "123456"
  },
  {
    id: 2,
    firstName: "suresh",
    lastName: "sharma",
    email: "suresh@sureshsharma.com",
    password: "123456"
  },
];


const typeDefs = gql`
    type Query {
        users: [User]
        user(id: ID!): User
    }

    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
    }
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args, context) => {
            // console.log(args);
            return users.find(item => item.id == args.id);
        }
    }
};

const server = new ApolloServer(
    {
        typeDefs,
        resolvers
    }
);

server.listen().then( ( {url} ) => {
    console.log(`Server ready at ${url}`);
});