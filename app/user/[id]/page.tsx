
import {getUser} from "@/app/rename/user";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getPostsByUser} from "@/app/rename/post";
import Link from "next/link";
import {EditUserButton, DeleteUserButton} from "./edit-delete-buttons";

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function UserDetail({params}: { params: Promise<{ id: string }> }) {
    const id = await params;
    const user = await getUser(parseInt(id.id));
    const posts = await getPostsByUser(parseInt(id.id));

    return (
        <>
            <div className={"p-20"}>
                <Card className="mb-8">
                    <CardHeader className={"flex justify-center flex-col gap-5"}>
                        <CardTitle className={"text-5xl"}>{user?.name}</CardTitle>
                        <CardDescription className={"text-2xl"}>
                            {posts.length} posts
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                        <p className={"text-sm opacity-60"}>User ID: {user?.id}</p>
                        <div className="flex gap-2">
                            <EditUserButton user={user} />
                            <DeleteUserButton userId={user?.id} />
                        </div>
                    </CardFooter>
                </Card>

                <h2 className="text-3xl font-bold mb-4">Posts by {user?.name}</h2>
                
                <div className="flex flex-col gap-4">
                    {posts.map(post => (
                        <Link key={post.id} href={`/blog/${post.id}`}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{post.title}</CardTitle>
                                    <CardDescription>{post.body}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                    
                    {posts.length === 0 && (
                        <p className="text-center text-gray-500">No posts yet</p>
                    )}
                </div>
            </div>
        </>
    )
}