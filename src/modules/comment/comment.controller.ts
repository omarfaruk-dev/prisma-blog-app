import { Request, Response } from "express";
import { CommentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        req.body.authorId = user?.id;
        const result = await CommentService.createComment(req.body)
        res.status(201).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Comment creation failed",
            details: e
        })
    }
}

const getCommentById = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        const result = await CommentService.getCommentById(commentId as string);
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({
            error: "Comment not found",
            details: error
        })
    }
}

const getCommentsByAuthorId = async (req: Request, res: Response) => {
    try {
        const { authorId } = req.params;
        const result = await CommentService.getCommentsByAuthorId(authorId as string);
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({
            error: "Comments not found for this author",
            details: error
        })
    }
}

const deleteComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { commentId } = req.params;
        const result = await CommentService.deleteComment(commentId as string, user?.id as string);
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({
            error: "Comment not found",
            details: error
        })
    }
}

const updateComment = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { commentId } = req.params;
        const result = await CommentService.updateComment(commentId as string,req.body, user?.id as string);
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({
            error: "Comment update failed",
            details: error
        })
    }
}

const moderateComment = async (req: Request, res: Response) => {
    try {
        const { commentId } = req.params;
        const result = await CommentService.moderateComment(commentId as string, req.body);
        res.status(200).json(result)
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Comment moderation failed";
        res.status(404).json({
            error: errorMessage,
            details: error
        })
    }
}





export const CommentController = {
    createComment,
    getCommentById,
    getCommentsByAuthorId,
    deleteComment,
    updateComment,
    moderateComment
}