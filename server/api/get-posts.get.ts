import { PrismaClient } from "@prisma/client";
import { serverSupabaseUser } from "#supabase/server";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const user = await serverSupabaseUser(event);

  let posts;
  if (user && (query.filterPosts === "1" || query.filterPosts === "true")) {
    posts = await prisma.post.findMany({
      where: {
        author: {
          userId: user?.id,
        },
      },
      include: {
        author: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    posts = await prisma.post.findMany({
      include: {
        author: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return posts;
});
