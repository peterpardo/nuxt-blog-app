import type { Post, PostWithUser } from "~/types";
import { v4 as uuidv4 } from "uuid";

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
    async createPost(post: string, filesData: File[] | null) {
      this.loading = true;

      const client = useSupabaseClient();
      const userStore = useUserStore();

      if (filesData) {
        for (let i = 0; i <= filesData.length - 1; i++) {
          const fileExtension = filesData[0].name.split(".").pop();

          const { data, error } = await client.storage
            .from("nuxt-blog-app-storage")
            .upload(`${uuidv4()}.${fileExtension}`, filesData[0]);

          if (error) {
            console.log(error.message);
          } else {
            console.log(data);
          }
        }
      }

      const { data, error } = await useFetch<PostWithUser>("/api/create-post", {
        method: "POST",
        body: {
          content: post,
          authorId: userStore.id,
        },
      });

      this.list?.unshift(data.value as PostWithUser);

      this.loading = false;

      return { error };
    },
  },
});
