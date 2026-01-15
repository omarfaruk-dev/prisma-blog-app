import { Post } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

//! Create a new post
const createPost = async (data: Omit<Post, 'id' | 'createdAt' | 'authorId' | 'updatedAt'>, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...data,
            authorId: userId
        }
    })
    return result
}

//! Get all posts
const getAllPosts = async (payload: {
    search: string | undefined,
    tags: string[] | []
}) => {

    const allPost = await prisma.post.findMany({
        where: {
            AND: [
                {
                    OR: [
                        {
                            title: {
                                contains: payload.search as string,
                                mode: 'insensitive'
                            }
                        },
                        {
                            content: {
                                contains: payload.search as string,
                                mode: 'insensitive'
                            }
                        },
                        {
                            tags: {
                                has: payload.search as string
                            }
                        }
                    ]
                },
                {
                    tags: {
                        hasEvery: payload.tags
                    }
                }
            ]
        }
    })
    return allPost;
}

export const PostService = {
    createPost,
    getAllPosts
}
