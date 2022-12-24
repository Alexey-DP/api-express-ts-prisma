import { db } from '../utils/db.server';
import { IAuthor } from './author.interface';

export const authorsList = async (): Promise<IAuthor[]> => {
    return db.author.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true
        },
    })
}

export const findAuthorById = async (id: number): Promise<IAuthor | null> => {
    return db.author.findUnique({
        where: { id },
    })
}

export const createAuthor = async (
    author: Omit<IAuthor, 'id'>): Promise<IAuthor> => {
    const { firstName, lastName } = author;
    return db.author.create({
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    })
}

export const updateAuthor = async (
    id: number,
    author: Omit<IAuthor, 'id'>): Promise<IAuthor> => {
    const { firstName, lastName } = author;
    return db.author.update({
        where: { id },
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true
        }
    })
}

export const deleteAuthor = async (id: number): Promise<void> => {
    await db.author.delete({
        where: { id }
    })
}