import type { Ref } from "vue";

export type Post = {
  id: number;
  user: {
    id?: number;
    name?: string;
    profilePicture?: string;
  };
  content: string;
  images: string[];
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
