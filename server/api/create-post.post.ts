import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const post = await prisma.post.create({
    data: {
      content: body.content,
      authorId: body.authorId,
    },
    include: {
      author: true,
      images: true,
    },
  });

  return post;
});
