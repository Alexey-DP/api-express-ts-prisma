import { db } from '../utils/db.server';
import { IBookWrite, IBookRead } from './book.interface';

export const booksList = async (): Promise<IBookRead[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        },
    })
}

export const findBookById = async (id: number): Promise<IBookRead | null> => {
    return db.book.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
}

export const createBook = async (
    book: IBookWrite): Promise<IBookRead> => {
    const { title,
        isFiction,
        datePublished,
        authorId } = book;

    return db.book.create({
        data: {
            title,
            isFiction,
            authorId,
            datePublished: new Date(datePublished)
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
}

export const updateBook = async (
    id: number,
    book: IBookWrite): Promise<IBookRead> => {
    const { title,
        isFiction,
        datePublished,
        authorId } = book;

    return db.book.update({
        where: { id },
        data: {
            title,
            isFiction,
            authorId,
            datePublished: new Date(datePublished)
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
}

export const deleteBook = async (id: number): Promise<void> => {
    await db.book.delete({
        where: { id }
    })
}