import express, { Application, Request, Response } from 'express';
import { postRouter } from './modules/post/post.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';


const app: Application = express();

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Server is up and running!');
});

app.use(express.json());
app.use('/posts', postRouter);

export default app;