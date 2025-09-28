import pc from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ApolloError, AuthenticationError } from 'apollo-server';

const prisma = new pc.PrismaClient();

const resolvers = {
    Query: {
        
    },
    Mutation: {
        signupUser: async (_, { userNew }) => {
            const user = await prisma.user.findUnique({
                where: { email : userNew.email }
            });

            if (user) {
                throw new AuthenticationError('Email đã tồn tại');
            }
            
            const hashedPassword = await bcrypt.hash(userNew.password, 10);
            
            const record = await prisma.user.create({
                data: {
                    ...userNew,
                    password: hashedPassword
                }
            });

            return record;
        }
    }
};

export default resolvers;