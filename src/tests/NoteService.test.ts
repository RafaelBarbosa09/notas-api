import NoteRepository from "../repositories/impl/NoteRepository";
import NoteService from "../services/NoteService";

describe('NoteService', () => {
    it('should save a note', async () => {
        const noteRepository = new NoteRepository();
        const noteService = new NoteService(noteRepository);

        const note = await noteService.assignNote({
            activityId: '1',
            courseId: '1',
            studentId: '1',
            value: 10,
        });

        expect(note).not.toBeNull();
    });

    it('should return all notes', async () => {
        const noteRepository = new NoteRepository();
        const noteService = new NoteService(noteRepository);

        await noteService.assignNote({
            activityId: '1',
            courseId: '1',
            studentId: '1',
            value: 10,
        });

        const notes = await noteService.getAllNotes();

        expect(notes).not.toHaveLength(0);
    });
});