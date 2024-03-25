import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const app: express.Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
