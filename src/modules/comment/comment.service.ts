import { CLIENT_RENEG_LIMIT } from "node:tls";
import { CommentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


const createComment = async (payload: {
    content: string;
    postId: string;
    authorId: string;
    parentId?: string;
}) => {

    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })
    if (payload.parentId) {
        await prisma.comment.findUniqueOrThrow({
            where: {
                id: payload.parentId
            }
        })

    }
    return await prisma.comment.create({
        data: payload
    })
}

const getCommentById = async (id: string) => {
    return await prisma.comment.findUnique({
        where: {
            id: id
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                }
            }
        }
    })
}

const getCommentsByAuthorId = async (authorId: string) => {
    console.log(authorId)
    return await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })
}

const deleteComment = async (commentId: string, authorId: string) => {
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true,
        }
    })
    if (!commentData) {
        throw new Error("Comment Not Found")
    }

    return await prisma.comment.delete({
        where: {
            id: commentId
        }
    })

}

const updateComment = async (commentId: string,data: {content?: string, status?: CommentStatus}, authorId: string) => {
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true,
        }
    })
    if (!commentData) {
        throw new Error("Comment Not Found")
    }

    return await prisma.comment.update ({
        where: {
            id: commentId
        },
        data
    })
}

const moderateComment = async (id: string, data: {status: CommentStatus}) => {
    const commentData = await prisma.comment.findFirstOrThrow({
        where: {
            id
        }
    })

    if(commentData.status === data.status) {
        throw new Error(`Comment is already ${data.status}`)
    }

    return await prisma.comment.update ({
        where: {
            id
        },
        data
    })
}

export const CommentService = {
    createComment,
    getCommentById,
    getCommentsByAuthorId,
    deleteComment,
    updateComment,
    moderateComment
}