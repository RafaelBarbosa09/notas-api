export default interface INoteRepository {
    save(note: Note): Promise<Note>;
    update(note: Note): Promise<Note>;
    delete(id: string): Promise<void>;
    getById(id: string): Promise<Note>;
    list(): Promise<Note[]>;
    getByActivityId(activityId: string): Promise<Note>;
}