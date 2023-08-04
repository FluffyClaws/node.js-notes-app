import express from "express";
import * as notesService from "../services/notesService";
import validateSchemaMiddleware from "../helpers/validateSchema";
import { noteSchema } from "../services/notesService";

const router = express.Router();

router.post("/", validateSchemaMiddleware(noteSchema), notesService.createNote);
router.delete("/:id", notesService.deleteNote);
router.patch(
  "/:id",
  validateSchemaMiddleware(noteSchema),
  notesService.editNote
);
router.get("/stats", notesService.getStats);
router.get("/:id", notesService.getNote);

router.get("/", notesService.getAllNotes);
router.get("/active", notesService.getActiveNotes);
router.get("/archived", notesService.getArchivedNotes);

export default router;
