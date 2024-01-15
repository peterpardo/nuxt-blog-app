import { Prisma, type Image } from "@prisma/client";
import type { Ref } from "vue";

const postWithUser = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { author: true, images: true },
});

export type PostWithUser = Prisma.PostGetPayload<typeof postWithUser>;

export type Post = {
  id: number;
  content: string;
  updatedAt?: string;
  createdAt?: string;
  images?: Image[];
  authorId?: number;
  author?: User;
};

export type Modal = {
  isOpen: Ref<boolean>;
  handleIsOpen: (value: boolean) => void;
};

export type User = {
  id: number;
  userId: string;
  name: string;
  email: string;
  avatar: string;
};
