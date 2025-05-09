'use server'
import {PrismaClient, User} from "@/app/generated/prisma";

const prisma = new PrismaClient()

export const createUser = async (name: string): Promise<User> => {
    return prisma.user.create({
        data: { name },
    });
};

export const getUser = async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { id },
        include: { posts: true }, // Include posts when fetching a user
    });
};

export const getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany({
        include: { posts: true }, // Include posts for all users
    });
};

export const updateUser = async (id: number, name: string): Promise<User> => {
    return prisma.user.update({
        where: { id },
        data: { name },
    });
};

export const deleteUser = async (id: number): Promise<User> => {
    // First delete all posts by this user to maintain referential integrity
    await prisma.post.deleteMany({
        where: { authorId: id },
    });

    return prisma.user.delete({
        where: { id },
    });
};