import {PrismaClient} from "@/app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
    // Seed Users
    const users = await prisma.user.createMany({
        data: [
            {name: 'Alice Johnson'},
            {name: 'Bob Smith'},
            {name: 'Charlie Brown'},
        ],
    });

    console.log(`Created ${users.count} users`);

    // Get user IDs to associate with posts
    const allUsers = await prisma.user.findMany();

    // Seed Posts
    const posts = await prisma.post.createMany({
        data: [
            {
                title: 'First Post',
                body: 'This is the content of the first post',
                authorId: allUsers[0].id,
            },
            {
                title: 'Second Post',
                body: 'This is the content of the second post',
                authorId: allUsers[1].id,
            },
            {
                title: 'Third Post',
                body: 'This is the content of the third post',
                authorId: allUsers[2].id,
            },
        ],
    });

    console.log(`Created ${posts.count} posts`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });