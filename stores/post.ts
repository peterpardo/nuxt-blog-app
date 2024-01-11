import type { Post } from "~/types";
import posts from "~/data/posts.json";

type PostState = {
  list: Post[];
  currentPost: Post | null;
  loading?: boolean;
};

export const usePostStore = defineStore("post", {
  state: (): PostState => ({ list: [], currentPost: null, loading: false }),
  actions: {
    async fetchPosts() {
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.list = posts;
      this.loading = false;
    },
    async createPost() {},
  },
});
