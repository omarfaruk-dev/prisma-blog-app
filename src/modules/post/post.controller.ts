import { Request, Response } from "express"
import { PostService } from "./post.service"

//! Create a new post
const createPost = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized User"
            })
        }
        const result = await PostService.createPost(req.body, user.id as string)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            error: "Post creation failed",
            details: error,
        })
    }
}

//! get all posts
const getAllPost = async (req: Request, res: Response) => {
    try {
        //*search query
        const { search } = req.query;
        const searchStr = typeof search === 'string' ? search : undefined;

        //* search by tags
        const tags = req.query.tags ? (req.query.tags as string).split(',') : [];

        //* filter by isFeatured
        //true or false
        const isFeatured = req.query.isFeatured
            ? req.query.isFeatured === 'true' ? true : req.query.isFeatured === 'false' ? false : undefined
            : undefined;

        const status = req.query.status

        const authorId = req.query.authorId as string | undefined

        const result = await PostService.getAllPosts({ search: searchStr, tags, isFeatured, status, authorId });
        res.status(200).json(result)

    } catch (error) {
        res.status(400).json({
            error: "Get post failed",
            details: error,
        })
    }
}

export const PostController = {
    createPost,
    getAllPost
}