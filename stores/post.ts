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
      let imageFiles = [];

      if (filesData) {
        for (let i = 0; i <= filesData.length - 1; i++) {
          const fileExtension = filesData[i].name.split(".").pop();

          const { data, error } = await client.storage
            .from("nuxt-blog-app-storage")
            .upload(`${uuidv4()}.${fileExtension}`, filesData[i]);

          if (error) {
            console.log(error.message);
          } else {
            console.log(data);
            imageFiles.push(data);
          }
        }
      }

      const { data, error } = await useFetch<PostWithUser>("/api/create-post", {
        method: "POST",
        body: {
          content: post,
          authorId: userStore.id,
          images: imageFiles,
        },
      });

      this.list?.unshift(data.value as PostWithUser);

      this.loading = false;

      return { error };
    },
    async deletePost(postId: number | null) {
      this.loading = true;

      const { data, error } = await useFetch(`/api/delete-post/${postId}`, {
        method: "DELETE",
      });

      this.list = this.list?.filter(
        (post) => post.id !== postId
      ) as PostWithUser[];

      this.loading = false;

      return { data, error };
    },
  },
});
