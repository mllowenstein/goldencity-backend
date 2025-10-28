
import db from '../data/notes.js';
import ErrorHandler from '../utils/errorHandler.js';
import asyncHandler from '../middlewares/helpers/asyncHandler.js';

/**
 * @desc    Get all notes
 * @route   GET /api/notes
 * @access  Public
 */
export const getAllNotes = asyncHandler(async (req, res, next) => {
  const notes = await db.getAllNotes();

  res.status(200).json({
    success: true,
    count: notes.length,
    data: notes,
  });
});

/**
 * @desc    Get single note by ID
 * @route   GET /api/notes/:id
 * @access  Public
 */
export const getNoteById = asyncHandler(async (req, res, next) => {
  const note = await db.getNoteById(req.params.id);

  if (!note) {
    return next(new ErrorHandler('Note not found', 404));
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

/**
 * @desc    Create new note
 * @route   POST /api/notes
 * @access  Public
 */
export const createNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  // Validation
  if (!title || !content) {
    return next(new ErrorHandler('Please provide both title and content', 400));
  }

  if (title.trim().length === 0) {
    return next(new ErrorHandler('Title cannot be empty', 400));
  }

  if (content.trim().length === 0) {
    return next(new ErrorHandler('Content cannot be empty', 400));
  }

  const newNote = await db.createNote({ title: title.trim(), content: content.trim() });

  res.status(201).json({
    success: true,
    message: 'Note created successfully',
    data: newNote,
  });
});

/**
 * @desc    Update note by ID
 * @route   PUT /api/notes/:id
 * @access  Public
 */
export const updateNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  // Validation
  if (!title && !content) {
    return next(new ErrorHandler('Please provide title or content to update', 400));
  }

  if (title !== undefined && title.trim().length === 0) {
    return next(new ErrorHandler('Title cannot be empty', 400));
  }

  if (content !== undefined && content.trim().length === 0) {
    return next(new ErrorHandler('Content cannot be empty', 400));
  }

  const updateData = {};
  if (title) updateData.title = title.trim();
  if (content) updateData.content = content.trim();

  const updatedNote = await db.updateNote(req.params.id, updateData);

  if (!updatedNote) {
    return next(new ErrorHandler('Note not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Note updated successfully',
    data: updatedNote,
  });
});

/**
 * @desc    Delete note by ID
 * @route   DELETE /api/notes/:id
 * @access  Public
 */
export const deleteNote = asyncHandler(async (req, res, next) => {
  const deletedNote = await db.deleteNote(req.params.id);

  if (!deletedNote) {
    return next(new ErrorHandler('Note not found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Note deleted successfully',
    data: deletedNote,
  });
});