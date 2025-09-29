import pc from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

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
        },
        signinUser: async (_, { userSignin }) => {
            const user = await prisma.user.findUnique({
                where: { email : userSignin.email }
            });

            if (!user) {
                throw new AuthenticationError('Đăng nhập không thành công! Vui lòng kiểm tra lại email và mật khẩu.');
            }

            const valid = await bcrypt.compare(userSignin.password, user.password);
            if (!valid) {
                throw new AuthenticationError('Đăng nhập không thành công! Vui lòng kiểm tra lại email và mật khẩu.');
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
            return { token };
        }
    }
};

export default resolvers;