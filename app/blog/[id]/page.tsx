import {getPost} from "@/app/rename/post";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {getUser} from "@/app/rename/user";

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
                    <CardFooter>
                        <p className={"text-sm opacity-60"}>By: {author?.name}</p>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}