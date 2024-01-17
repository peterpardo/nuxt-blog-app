import { PrismaClient, type Image as PrismaImage } from "@prisma/client";

type Image = {
  id: string;
  path: string;
  fullPath: string;
};

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody<{
    content: string;
    images: Image[];
    deletedFiles: PrismaImage[];
  }>(event);

  const images = body.images.map((img: Image) => ({
    name: img.path,
    imageId: img.id,
  }));

  if (body.deletedFiles) {
    for (let i = 0; i <= body.deletedFiles.length - 1; i++) {
      await prisma.image.delete({
        where: {
          id: body.deletedFiles[i].id,
        },
      });
    }
  }

  const post = await prisma.post.update({
    where: {
      id: parseInt(id as string),
    },
    data: {
      content: body.content,
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
