import {getAllPosts, handleCreatePost} from "@/app/rename/post";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {getAllUsers, getUser} from "@/app/rename/user";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default async function BlogPage() {
    const posts = await getAllPosts()
    const author = await getAllUsers()

    const authors = await Promise.all(
        posts.map(post => getUser(post.authorId))
    )

    const postWithAuthor = posts.map((post: any, index: string | number) => {
        return {
            ...post,
            author: authors[index]
        }
    })

    const formSchema = z.object({
        title: z.string().min(3, {message: "Title must be at least 3 characters"}).max(20),
        body: z.string().min(10, {message: "Body must be at least 10 characters"}).max(1000),
        authorId: z.number().min(1, {message: "Author must be selected"}),
    })

    return (
        <>
            <div className="flex flex-col gap-6 p-20">
                <Card>
                    <CardHeader>
                        <CardTitle>Create a new post</CardTitle>
                        <CardDescription>
                            Fill out the form below to create a new post.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={handleCreatePost} className={"flex flex-col gap-5"}>
                            <Input type="text" name="title" placeholder="Title" required minLength={3} maxLength={20}/>
                            <Input type="text" name="body" placeholder="Description" required minLength={10} maxLength={1000}/>
                            <select name="authorId" className={"border-input bg-input/30 p-2"} required>
                                <option value="">Select an author</option>
                                {author.map(author => (
                                    <option key={author?.id} value={author?.id}>{author?.name}</option>
                                ))}
                            </select>
                            <Button type="submit">Create</Button>
                        </form>
                    </CardContent>
                </Card>
                {postWithAuthor.map(post => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                        <Card>
                            <CardHeader className={"flex justify-center flex-col gap-5"}>
                                <CardTitle className={"text-3xl"}>{post?.title}</CardTitle>
                                <CardDescription className={"text-1xl"}>{post?.body}</CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <p className={"text-sm opacity-60"}>By: {post?.author?.name}</p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))
                }
            </div>
        </>
    )
}
