import {Post, PrismaClient} from "@/app/generated/prisma";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const prisma = new PrismaClient()

export const createPost = async (
    title: string,
    body: string,
    authorId: number
): Promise<Post> => {
    return prisma.post.create({
        data: {
            title,
            body,
            author: {connect: {id: authorId}}
        }
    })
}

export const handleCreatePost = async (formData: FormData) => {
    'use server';
    const title = formData.get("title") as string;
    const body = formData.get("body") as string
    const authorId = formData.get("authorId") as string

    if (!title || title.length < 3) {
        return {error: 'Title must be at least 3 characters long'};
    }

    if (!body || body.length < 10) {
        return {error: 'Content must be at least 10 characters long'};
    }

    if (!authorId) {
        return {error: 'Author ID is required'};
    }

    // Validate that authorId is a valid number
    const authorIdNum = parseInt(authorId);
    if (isNaN(authorIdNum)) {
        return {error: 'Author ID must be a valid number'};
    }

    try {
        const post = await createPost(title, body, authorIdNum);
        // Revalidate the blog page to show the new post
        revalidatePath('/blog');
        // Redirect to the blog page
        redirect('/blog');
        return post;
    } catch (e: Error | any) {
        return {error: e.message}
    }

}

export const getPost = async (id: number): Promise<Post | null> => {
    return prisma.post.findUnique({
        where: {id},
        include: {author: true}
    })
}

export const getAllPosts = async (): Promise<Post[]> => {
    return prisma.post.findMany({
        include: {author: true}
    })
}

export const updatePost = async (
    id: number,
    title: string,
    body: string
): Promise<Post | null> => {
    return prisma.post.update({
        where: {id},
        data: {
            title,
            body
        }
    })
}

export const deletePost = async (id: number): Promise<Post | null> => {
    return prisma.post.delete({
        where: {id}
    })
}

export const getPostsByUser = async (userId: number): Promise<Post[]> => {
    return prisma.post.findMany({
        where: {authorId: userId},
        include: {author: true}
    })
}
