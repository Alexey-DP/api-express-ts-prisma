import { Router } from 'express';
import { body } from "express-validator";
import * as AuthorController from './author.controller';

export const authorRouter = Router();

authorRouter
    // GET: List of all Authors
    .get('/', AuthorController.getAuthorsListHandler)
    // GET: A single author by ID
    .get('/:id', AuthorController.getAuthorByIdHandler)
    // POST: Create a Author
    // Params: firstName, lastName
    .post('/',
        body('firstName').isString().notEmpty(),
        body('lastName').isString().notEmpty(),
        AuthorController.createAuthorHandler)
    // PUT: Updating an Author
    // Params: firstName, lastName
    .put('/:id',
        body('firstName').isString().notEmpty(),
        body('lastName').isString().notEmpty(),
        AuthorController.updateAuthorHandler)
    // DELETE: Delete an author based on the id
    .delete('/:id', AuthorController.deleteAuthorHandler)