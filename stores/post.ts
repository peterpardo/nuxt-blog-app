import type { Post } from "~/types";

type PostState = {
  //   list: Post[];
  list: any;
  currentPost: Post | null;
  loading?: boolean;
};

export const usePostStore = defineStore("post", {
  state: (): PostState => ({ list: [], currentPost: null, loading: false }),
  actions: {
    async fetchPosts() {
      this.loading = true;
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      this.list = await response.json();
      this.loading = false;
    },
  },
});
