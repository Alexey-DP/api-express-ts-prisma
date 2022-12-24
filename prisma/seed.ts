import { db } from '../src/utils/db.server';

interface ICreatedAuthor {
    firstName: string;
    lastName: string;
}

interface ICreatedBook {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

const getAuthors = (): ICreatedAuthor[] => ([
    {
        firstName: "John",
        lastName: "Doe",
    },
    {
        firstName: "William",
        lastName: "Shakespeare",
    },
    {
        firstName: "Yuval Noah",
        lastName: "Harari",
    },
])

const getBooks = (): ICreatedBook[] => ([
    {
        title: "Sapiens",
        isFiction: false,
        datePublished: new Date(),
    },
    {
        title: "Homo Deus",
        isFiction: false,
        datePublished: new Date(),
    },
    {
        title: "The Ugly Duckling",
        isFiction: true,
        datePublished: new Date(),
    },
])

const seed = async () => {
    await Promise.all(
        getAuthors().map(author =>
            db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName,
                }
            })
        )
    )

    const author = await db.author.findFirst({
        where: {
            firstName: "Yuval Noah"
        }
    })

    if (author) {
        await Promise.all(
            getBooks().map(book => {
                const { title, isFiction, datePublished } = book;
                return db.book.create({
                    data: {
                        title,
                        isFiction,
                        datePublished,
                        authorId: author.id
                    }
                })
            })
        )
    }
}

seed();