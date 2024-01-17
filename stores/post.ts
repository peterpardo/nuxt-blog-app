import type { Post, PostWithUser } from "~/types";
import { v4 as uuidv4 } from "uuid";

type PostState = {
  list: PostWithUser[] | null;
  currentPost: Post | null;
  loading?: boolean;
  config: "EDIT" | "CREATE";
};

export const usePostStore = defineStore("post", {
  state: (): PostState => ({
    list: [],
    currentPost: null,
    loading: false,
    config: "CREATE",
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
    async editPost(
      post: string,
      filesData: File[] | null,
      filesDisplay: { id: string | number; name: string }[] | null
    ) {
      this.loading = true;

      const client = useSupabaseClient();

      // compare the origFiles and the filesDisplay
      // filter the files that are not present in the origFiles
      const removedFiles = this.currentPost?.images?.filter(
        (img) => !filesDisplay?.some((file) => file.id === img.id)
      );
      const formattedRemovedFiles = removedFiles?.map((file) => file.name);

      // delete the filtered files in supabase storage
      if (removedFiles && removedFiles.length > 0) {
        const { data: storageData, error: storageError } = await client.storage
          .from("nuxt-blog-app-storage")
          .remove(formattedRemovedFiles as string[]);

        if (storageError) {
          console.log(storageError.message);
        }
      }

      // check if new files are uploaded
      // upload the new files
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
            imageFiles.push(data);
          }
        }
      }

      // edit the post
      // delete the files in the database as well
      const { data, error } = await useFetch<PostWithUser>(
        `/api/edit-post/${this.currentPost?.id}`,
        {
          method: "PUT",
          body: {
            content: post,
            images: imageFiles,
            deletedFiles: removedFiles,
          },
        }
      );

      const updatedItemIndex = this.list?.findIndex(
        (item) => item.id === data.value?.id
      );

      if (updatedItemIndex !== undefined) {
        this.list?.splice(updatedItemIndex, 1, data.value as PostWithUser);
      }

      this.loading = false;

      return { data, error };
    },
  },
});
