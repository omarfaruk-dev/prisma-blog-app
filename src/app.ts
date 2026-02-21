import express, { Application, Request, Response } from 'express';
import { postRouter } from './modules/post/post.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors';
import { commentRouter } from './modules/comment/comment.router';

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || 'http://localhost:4000',
    credentials: true,
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Server is up and running!');
});

app.use(express.json());
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

export default app;