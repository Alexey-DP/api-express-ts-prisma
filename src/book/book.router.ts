import { Router } from 'express';
import { body } from "express-validator";
import * as BookController from './book.controller';

export const bookRouter = Router();

bookRouter
    // GET: List all the books
    .get('/', BookController.getBooksListHandler)
    // GET: A book based on the id
    .get('/:id', BookController.getBookByIdHandler)
    // POST: Create a Book
    // Params: title, isFiction, datePublished, authorId
    .post('/',
        body('title').isString().notEmpty(),
        body('authorId').isInt().notEmpty(),
        body('datePublished').isDate().toDate().notEmpty(),
        body('isFiction').isBoolean().notEmpty(),
        BookController.createBookHandler)
    // PUT: Update book
    // Params: title, isFiction, datePublished, authorId
    .put('/:id',
        body('title').isString().notEmpty(),
        body('authorId').isInt().notEmpty(),
        body('datePublished').isDate().toDate().notEmpty(),
        body('isFiction').isBoolean().notEmpty(),
        BookController.updateBookHandler)
    // DELETE: Delete a book based on the id
    .delete('/:id', BookController.deleteBookHandler)