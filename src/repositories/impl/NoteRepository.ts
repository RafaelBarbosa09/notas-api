import INoteRepository from "../INoteRepository";

export default class NoteRepository implements INoteRepository {
    private notes: Note[] = [];

    public async save(note: Note): Promise<Note> {
        this.notes.push(note);
        return note;
    }

    public async update(note: Note): Promise<Note> {
        const index = this.notes.findIndex((n) => n.activityId === note.activityId);
        this.notes[index] = note;
        return note;
    }

    public async delete(id: string): Promise<void> {
        const index = this.notes.findIndex((note) => note.activityId === id);
        this.notes.splice(index, 1);
    }

    public async getById(id: string): Promise<Note> {
        const note = this.notes.find((note) => note.activityId === id);
        return note!!;
    }

    public async getByActivityId(activityId: string): Promise<Note> {
        const note = this.notes.find((note) => note.activityId === activityId);
        return note!!;
    }

    public async list(): Promise<Note[]> {
        return this.notes;
    }
}
