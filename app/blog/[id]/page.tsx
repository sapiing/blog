import {getPost} from "@/app/rename/post";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getUser} from "@/app/rename/user";
import {EditPostButton, DeletePostButton} from "./edit-delete-buttons";

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function BlogDetail({params}: { params: Promise<{ id: string }> }) {
    const id = await params
    const posts = await getPost(parseInt(id.id))
    const author = await getUser(parseInt(id.id))

    return (
        <>
            <div className={"p-20"}>
                <Card>
                    <CardHeader className={"flex justify-center flex-col gap-5"}>
                        <CardTitle className={"text-5xl"}>{posts?.title}</CardTitle>
                        <CardDescription className={"text-2xl"}>{posts?.body}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                        <p className={"text-sm opacity-60"}>By: {author?.name}</p>
                        <div className="flex gap-2">
                            <EditPostButton post={posts} />
                            <DeletePostButton postId={posts?.id} />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}
