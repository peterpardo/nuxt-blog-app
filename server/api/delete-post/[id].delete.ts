import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const post = await prisma.post.delete({
    where: {
      id: parseInt(id as string),
    },
  });

  return post;
});
