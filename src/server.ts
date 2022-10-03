import express from 'express';
import RabbitmqServer from './rabbitmq-server';
import NoteRepository from './repositories/impl/NoteRepository';
import NoteService from './services/NoteService';
import swaggerFile from './swagger.json';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());

const noteService = new NoteService(new NoteRepository());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.json());

/**
 * @summary consome atividades da fila
 * @returns {Array} activities
 */
app.get('/notes/consume', async (req, res) => {
    const server = new RabbitmqServer('amqp://guest:guest@localhost:5672')
    await server.start();

    var list: Activity[] = [];

    await server.consume('atividades', (message) => {
        list = JSON.parse(message.content.toString());
    });

    await server.stop();

    res.json(list);
});

/**
 * @param {string} idStudent
 * @returns {Array} notes
 * @summary Corrige uma atividade.
 */
app.post('/notes/assign', async (req, res) => {
    const { activityId, courseId, studentId, value } = req.body;

    try {
        const noteAssigned = await noteService.getNoteByActivityId(activityId);
        if (noteAssigned) {
            throw new Error('Nota já atribuída para essa atividade');
        }

        const note = await noteService.assignNote({ activityId, courseId, studentId, value });
        res.status(201).json(note);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

/**
 * @returns {Array} notes
 * @summary retorna todas as notas.
 */
app.get('/notes', async (req, res) => {
    const notes = await noteService.getAllNotes();
    res.json(notes);
});

/**
 * @param {string} idStudent
 * @returns {Array} notes
 * @summary Retorna todas as notas de um estudante
 */
app.get('/notes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const notes = await noteService.getNotesByStudentId(id);
        if (!notes) {
            throw new Error('Nenhuma nota encontrada para esse estudante');
        }

        res.json(notes);
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log('notas-api iniciado na porta 3001 🚀🚀🚀');
});