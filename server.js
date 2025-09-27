import {ApolloServer,gql} from "apollo-server";
import crypto from "crypto";
import { title } from "process";

const users = [
  {
    id: "d24259be-0f55-4b74-a859-1028a1b49b0a",
    firstName: "mukesh",
    lastName: "kumar",
    email: "mukesh@mukeshkumar.com",
    password: "123456"
  },
  {
    id: "4cc1ec7c-76c7-4bdc-bf6a-a3b8ae643690",
    firstName: "suresh",
    lastName: "sharma",
    email: "suresh@sureshsharma.com",
    password: "123456"
  },
];

const Todos = [
    {
        title: "buy book",
        by: "d24259be-0f55-4b74-a859-1028a1b49b0a"
    },
    {
        title: "write code",
        by: "d24259be-0f55-4b74-a859-1028a1b49b0a"
    },
    {
        title: "record video",
        by: "4cc1ec7c-76c7-4bdc-bf6a-a3b8ae643690"
    }
]


const typeDefs = gql`
    type Query {
        users: [User]
        user(id: ID!): User
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Mutation {
        createUser(userNew: UserInput!): User
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        todos: [Todo]
    }

    type Todo {
        title: String
        by: ID
    }
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args, context) => {
            // console.log(args);
            return users.find(item => item.id == args.id);
        }
    },
    User: {
        todos: (parent) => {
            // console.log(parent);
            return Todos.filter(todo => todo.by == parent.id);
        }
    },
    Mutation: {
        createUser: (_, {userNew}) => {
            const record = {
                id: crypto.randomUUID(),
                ...userNew
            };
            users.push(record);

            console.log(record);
            return record;
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