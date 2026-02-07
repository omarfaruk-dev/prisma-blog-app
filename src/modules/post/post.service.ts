import { Post } from "../../../generated/prisma/client"
import { PostWhereInput } from "../../../generated/prisma/models"
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
const getAllPosts = async ({ search, tags, isFeatured, status, authorId, page, limit, skip }: {
    search: string | undefined,
    tags: string[] | [],
    isFeatured: boolean | undefined,
    status: PostStatus | undefined ,
    authorId: string | undefined,
    page: number,
    limit: number,
    skip: number
}) => {

    const andConditions:PostWhereInput[] = [];

    if (search) {
        andConditions.push({
            OR: [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    content: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    tags: {
                        has: search
                    }
                }
            ]
        })
    }

    if(tags.length > 0) {
        andConditions.push({
            tags: {
                hasEvery: tags as string[]
            }
        })
    }

    if(typeof isFeatured ==='boolean') {
        andConditions.push({
            isFeatured
        })
    }

    if(status) {
        andConditions.push({
            status
        })
    }
    if(authorId) {
        andConditions.push({
            authorId
        })
    }

    const allPost = await prisma.post.findMany({
        take: limit,
        skip,
        where: {
            AND: andConditions
        }
    })
    return allPost;
}

export const PostService = {
    createPost,
    getAllPosts
}
