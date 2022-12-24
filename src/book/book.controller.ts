import { NextFunction, Request, Response } from 'express';
import { validationResult } from "express-validator";
import { RESPONSE_MESSAGES } from '../constants/responseMessages';
import * as BookService from "./book.service";
import * as AuthorService from "../author/author.service";
import { IBookWrite } from './book.interface';

export const getBooksListHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const books = await BookService.booksList();
        return response.status(200).json(books);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const getBookByIdHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const id: number = parseInt(request.params.id, 10);
        const book = await BookService.findBookById(id);
        if (book) {
            return response.status(200).json(book);
        }
        return response.status(200).json(RESPONSE_MESSAGES.BOOK_NOT_FOUND);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const createBookHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const book: IBookWrite = request.body;
        const author = await AuthorService.findAuthorById(book.authorId);
        if (!author) {
            return response.status(200).json(RESPONSE_MESSAGES.AUTHOR_NOT_FOUND);
        }
        const newBook = await BookService.createBook(book);
        return response.status(201).json(newBook);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const updateBookHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const author = await AuthorService.findAuthorById(request.body.authorId);
        if (!author) {
            return response.status(200).json(RESPONSE_MESSAGES.AUTHOR_NOT_FOUND);
        }
        const id: number = parseInt(request.params.id, 10);
        const updatedBook = await BookService.updateBook(id, request.body);
        return response.status(201).json(updatedBook);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return response.status(200).json(RESPONSE_MESSAGES.BOOK_NOT_FOUND);
        }
        return response.status(500).json(error.message);
    }
}

export const deleteBookHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const id: number = parseInt(request.params.id, 10);
        await BookService.deleteBook(id);
        return response.status(204).json('Book has been successfully deleted');
    } catch (error: any) {
        if (error.code === 'P2025') {
            return response.status(200).json(RESPONSE_MESSAGES.BOOK_NOT_FOUND);
        }
        return response.status(500).json(error.message);
    }
}