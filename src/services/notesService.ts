import { Request, Response } from "express";
import { notesRepository, Note } from "../repositories/notesRepository";
import * as yup from "yup";

export const noteSchema = yup.object().shape({
  content: yup.string().required(),
  category: yup.string().required(),
  dates: yup.array().of(yup.date()),
});

export const extractDatesFromContent = (text: string) => {
  const dateRegex = /(\d{1,2}[/.]\d{1,2}[/.]\d{4})/g;
  const datesFound = text.match(dateRegex);
  return datesFound ? datesFound.map((date) => date.replace(/\./g, "/")) : [];
};

export const createNote = (req: Request, res: Response) => {
  const noteData = req.body;
  const dates = extractDatesFromContent(noteData.content);

  const newNote: Note = {
    id: notesRepository.length + 1,
    ...noteData,
    dates,
  };

  notesRepository.push(newNote);
  res.status(201).json(newNote);
};

export const editNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id); // Convert the id parameter to a number

  const noteData = req.body;
  const dates = extractDatesFromContent(noteData.content);

  const index = notesRepository.findIndex((note) => note.id === numericId);
  if (index !== -1) {
    const updatedNote: Note = {
      id: notesRepository[index].id,
      ...noteData,
      dates,
    };
    notesRepository[index] = updatedNote;
    res.json(updatedNote);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
};

export const deleteNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = notesRepository.findIndex((note) => note.id === Number(id));
  if (index !== -1) {
    notesRepository.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
};

export const getNote = (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);

  const note = notesRepository.find((note) => note.id === numericId);

  if (note) {
    const extractedDates = extractDatesFromContent(note.content);
    const noteWithExtractedDates: Note = {
      ...note,
      dates: extractedDates,
    };

    res.json(noteWithExtractedDates);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
};

export const getAllNotes = (_req: Request, res: Response) => {
  const notesWithExtractedDates = notesRepository.map((note) => {
    const extractedDates = extractDatesFromContent(note.content);
    return {
      ...note,
      dates: extractedDates,
    };
  });

  res.json(notesWithExtractedDates);
};

export const getActiveNotes = (_req: Request, res: Response) => {
  const activeNotes = notesRepository.filter((note) => !note.archived);
  const notesWithExtractedDates = activeNotes.map((note) => {
    const extractedDates = extractDatesFromContent(note.content);
    return {
      ...note,
      dates: extractedDates,
    };
  });
  res.json(notesWithExtractedDates);
};

export const getArchivedNotes = (_req: Request, res: Response) => {
  const archivedNotes = notesRepository.filter((note) => note.archived);
  const notesWithExtractedDates = archivedNotes.map((note) => {
    const extractedDates = extractDatesFromContent(note.content);
    return {
      ...note,
      dates: extractedDates,
    };
  });
  res.json(notesWithExtractedDates);
};

export const getStats = (_req: Request, res: Response) => {
  const totalNotes = notesRepository.length;
  const activeNotes = notesRepository.filter((note) => !note.archived).length;
  const archivedNotes = notesRepository.filter((note) => note.archived).length;

  let totalDates = 0;
  for (const note of notesRepository) {
    const extractedDates = extractDatesFromContent(note.content);
    totalDates += extractedDates.length;
  }

  res.json({
    totalNotes,
    activeNotes,
    archivedNotes,
    totalDates,
  });
};
