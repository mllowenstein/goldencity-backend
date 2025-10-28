import express from 'express';
import * as notesController from '../controllers/notesController.js';

const router = express.Router();

// Base route: /api/notes
router
  .route('/')
  .get(notesController.getAllNotes)
  .post(notesController.createNote);

// Dynamic route: /api/notes/:id
router
  .route('/:id')
  .get(notesController.getNoteById)
  .put(notesController.updateNote)
  .delete(notesController.deleteNote);

export default router;