import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await prisma.user.create({
    data: {
      userId: body.userId,
      name: body.name,
      email: body.email,
      avatar: body.avatar,
    },
  });

  return { user };
});
