import INoteRepository from "../repositories/INoteRepository";

export default class NoteService {
    private repository: INoteRepository;

    constructor(repository: INoteRepository) {
        this.repository = repository;
    }

    public async updateNote(note: Note): Promise<Note> {
        return await this.repository.update(note);
    }

    public async deleteNote(id: string): Promise<void> {
        return await this.repository.delete(id);
    }

    public async getNoteById(id: string): Promise<Note> {
        return await this.repository.getById(id);
    }

    public async getAllNotes(): Promise<Note[]> {
        return await this.repository.list();
    }

    public async getNotesByStudentId(studentId: string): Promise<Note[]> {
        const notes = await this.repository.list();
        return notes.filter((note) => note.studentId === studentId);
    }

    public async assignNote(note: Note): Promise<Note> {
        return await this.repository.save(note);
    }

    public async getNoteByActivityId(activityId: string): Promise<Note> {
        return await this.repository.getByActivityId(activityId);
    }
}