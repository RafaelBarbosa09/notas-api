import express from 'express';
import RabbitmqServer from './rabbitmq-server';
import swaggerFile from './swagger.json';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const server = new RabbitmqServer('amqp://guest:guest@localhost:5672')
    await server.start();

    const list: string[] = [];

    await server.consume('atividades', (message) => {
        list.push(JSON.parse(message.content.toString()));
    });
    res.json(list);
});

app.listen(3001, () => {
    console.log('notas-api iniciado na porta 3001 🚀🚀🚀');
});