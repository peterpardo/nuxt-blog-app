import { PrismaClient } from "@prisma/client";

type Image = {
  id: string;
  path: string;
  fullPath: string;
};

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const images = body.images.map((img: Image) => ({
    name: img.path,
    imageId: img.id,
  }));

  const post = await prisma.post.create({
    data: {
      content: body.content,
      authorId: body.authorId,
      images: {
        create: images,
      },
    },
    include: {
      author: true,
      images: true,
    },
  });

  return post;
});
