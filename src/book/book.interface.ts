import { IAuthor } from '../author/author.interface';

export interface IBook {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

export interface IBookRead extends IBook {
    id: number;
    author: IAuthor;
}

export interface IBookWrite extends IBook {
    authorId: number;
}