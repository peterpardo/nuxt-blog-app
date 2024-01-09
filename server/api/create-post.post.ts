import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const posts = await prisma.post.create({
    data: {
      content: "First Content",
      authorId: 1,
    },
  });

  return {
    posts,
  };
});
