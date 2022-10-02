import express from 'express';
import RabbitmqServer from './rabbitmq-server';
import ActivityRepository from './repositories/impl/ActivityRepository';
import NoteRepository from './repositories/impl/NoteRepository';
import NoteService from './services/NoteService';
import swaggerFile from './swagger.json';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());

const noteService = new NoteService(new NoteRepository(), new ActivityRepository());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const server = new RabbitmqServer('amqp://guest:guest@localhost:5672')
    await server.start();

    var list: Activity[] = [];

    await server.consume('atividades', (message) => {
        list = JSON.parse(message.content.toString());
    });

    await server.stop();

    res.json(list);
});

app.post('/notes', async (req, res) => {
    const { activityId, courseId, studentId, value } = req.body;

    try {
        const note = await noteService.assignNote({ activityId, courseId, studentId, value });
        if (!note) {
            throw new Error('Erro ao criar nota');
        }

        res.status(201).json(note);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log('notas-api iniciado na porta 3001 🚀🚀🚀');
});