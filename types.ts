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
