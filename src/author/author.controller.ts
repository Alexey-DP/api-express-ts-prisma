import { NextFunction, Request, Response } from 'express';
import { validationResult } from "express-validator";
import { RESPONSE_MESSAGES } from '../constants/responseMessages';
import * as AuthorService from "./author.service";

export const getAuthorsListHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const authors = await AuthorService.authorsList();
        return response.status(200).json(authors);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const getAuthorByIdHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const id: number = parseInt(request.params.id, 10);
        const author = await AuthorService.findAuthorById(id);
        if (author) {
            return response.status(200).json(author);
        }
        return response.status(200).json(RESPONSE_MESSAGES.AUTHOR_NOT_FOUND);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const createAuthorHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const author = request.body;
        const newAuthor = await AuthorService.createAuthor(author);
        return response.status(201).json(newAuthor);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
}

export const updateAuthorHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        const id: number = parseInt(request.params.id, 10);
        const updatedAuthor = await AuthorService.updateAuthor(id, request.body);
        return response.status(201).json(updatedAuthor);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return response.status(200).json(RESPONSE_MESSAGES.AUTHOR_NOT_FOUND);
        }
        return response.status(500).json(error.message);
    }
}

export const deleteAuthorHandler = async (
    request: Request,
    response: Response,
    next: NextFunction) => {
    try {
        const id: number = parseInt(request.params.id, 10);
        await AuthorService.deleteAuthor(id);
        return response.status(204).json('Author has been successfully deleted');
    } catch (error: any) {
        if (error.code === 'P2025') {
            return response.status(200).json(RESPONSE_MESSAGES.AUTHOR_NOT_FOUND);
        }
        return response.status(500).json(error.message);
    }
}