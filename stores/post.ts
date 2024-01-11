import type { Post, PostWithUser } from "~/types";
import posts from "~/data/posts.json";

type PostState = {
  list: PostWithUser[] | null;
  currentPost: Post | null;
  loading?: boolean;
};

export const usePostStore = defineStore("post", {
  state: (): PostState => ({
    list: [],
    currentPost: null,
    loading: false,
  }),
  actions: {
    async fetchPosts(filterPosts: boolean = false) {
      this.loading = true;

      const { data, error } = await useFetch<PostWithUser[]>(`/api/get-posts`, {
        query: { filterPosts: filterPosts },
      });

      if (error.value) {
        console.log(error.value);
      } else {
        this.list = data.value;
      }

      this.loading = false;
    },
    async createPost() {},
  },
});
