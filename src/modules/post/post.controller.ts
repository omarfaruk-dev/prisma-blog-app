import { Request, Response } from "express"
import { PostService } from "./post.service"

const createPost = async (req: Request, res: Response) => {
    try {
        const result = await PostService.createPost(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error instanceof Error ? { message: error.message } : error)
    }
}

export const PostController = {
    createPost
}