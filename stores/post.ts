import type { Post, PostWithUser } from "~/types";
import posts from "~/data/posts.json";

type PostState = {
  list: PostWithUser[] | null;
  currentPost: Post | null;
  filterPosts: boolean;
  loading?: boolean;
};

export const usePostStore = defineStore("post", {
  state: (): PostState => ({
    list: [],
    currentPost: null,
    filterPosts: false,
    loading: false,
  }),
  actions: {
    async fetchPosts() {
      this.loading = true;

      const { data, error } = await useFetch<PostWithUser[]>(`/api/get-posts`, {
        query: { filterPosts: this.filterPosts },
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
