import express, { Application, Request, Response } from 'express';
import { postRouter } from './modules/post/post.router';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Server is up and running!');
});

app.use(express.json());
app.use('/posts', postRouter);

export default app;