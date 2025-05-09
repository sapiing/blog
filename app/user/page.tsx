import {getAllUsers} from "@/app/rename/user";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {getPostsByUser} from "@/app/rename/post";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {handleCreateUser} from "@/app/rename/user-actions";

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function UserPage() {
    const users = await getAllUsers();

    return (
        <>
            <div className="flex flex-col gap-6 p-20">
                <Card>
                    <CardHeader>
                        <CardTitle>Create a new user</CardTitle>
                        <CardDescription>
                            Fill out the form below to create a new user.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={handleCreateUser} className={"flex flex-col gap-5"}>
                            <Input type="text" name="name" placeholder="Name" required minLength={3} maxLength={20}/>
                            <Button type="submit">Create</Button>
                        </form>
                    </CardContent>
                </Card>
                {users.map(user => (
                    <Link key={user.id} href={`/user/${user.id}`}>
                        <Card>
                            <CardHeader className={"flex justify-center flex-col gap-5"}>
                                <CardTitle className={"text-3xl"}>{user?.name}</CardTitle>
                                <CardDescription className={"text-1xl"}>
                                    {user?.posts?.length} posts
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <p className={"text-sm opacity-60"}>User ID: {user?.id}</p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    )
}