<template>
  <UModal
    v-model="isOpen"
    :prevent-close="isLoading">
    <UCard :ui="{ base: 'relative' }">
      <template #header>
        <h1 class="text-xl text-primary font-semibold">Create Post</h1>
      </template>

      <UFormGroup
        label="What is on your mind?"
        :error="errorMessage">
        <UTextarea
          autoresize
          v-model="post"
          placeholder="Content here..." />
      </UFormGroup>

      <UFormGroup class="my-2">
        <template #label>
          <div
            class="flex flex-col justify-center items-center gap-x-2 bg-gray-100 cursor-pointer hover:bg-gray-200 px-2 py-1 rounded w-20 h-20">
            <UIcon
              name="i-ic-baseline-plus"
              dynamic />
            <p class="text-xs">Add Image</p>
          </div>
        </template>

        <template #default>
          <UInput
            type="file"
            ref="files"
            @change="onChange"
            multiple
            class="hidden"
            accept=".jpg,.jpeg,.png" />
        </template>
      </UFormGroup>

      <div
        class="grid grid-cols-2 gap-5"
        v-if="filesDisplay">
        <div
          v-for="(fileDisplay, i) in filesDisplay"
          :key="i"
          class="relative grid place-content-center">
          <img
            :src="fileDisplay"
            class="w-full" />
          <div
            @click="deleteFile(i)"
            class="absolute inset-0 justify-center flex items-center bg-gray-50 bg-opacity-50 opacity-0 w-full h-full hover:opacity-100 cursor-pointer">
            <p class="text-red-500 bg-white rounded px-2 py-1">Delete</p>
          </div>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="absolute inset-0 grid place-content-center bg-white bg-opacity-50 \">
        <div class="flex items-center gap-x-2">
          <UIcon
            name="i-heroicons-arrow-path-16-solid"
            dynamic
            class="animate-spin" />

          Creating post...
        </div>
      </div>

      <template #footer>
        <div class="flex">
          <UButton
            :disabled="!isPostValid"
            class="ml-auto"
            @click="createPost"
            :variant="!isPostValid ? 'outline' : 'solid'"
            >Post</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import type { Modal } from "~/types";
  import { ModalKey } from "~/symbols";
  import { v4 as uuidv4 } from "uuid";

  const userStore = useUserStore();
  const client = useSupabaseClient();

  const post = ref("");
  const toast = useToast();
  const files = ref(null);
  const filesData = ref<File[] | null>([]);
  const errorMessage = ref<string | undefined>("");
  const filesDisplay = ref<string[] | null>([]);
  const isLoading = ref(false);
  const { isOpen, handleIsOpen } = inject(ModalKey) as Modal;

  const isPostValid = computed(() => post.value.length < 100);

  watchEffect(() => {
    if (!isPostValid.value) {
      errorMessage.value = "Post must be 100 characters below.";
    }
  });

  watch(post, () => {
    if (post.value !== "") {
      errorMessage.value = undefined;
    }
  });

  watch(isOpen, () => {
    if (!isOpen.value) {
      clearData();
    }
  });

  function clearData() {
    post.value = "";
    filesDisplay.value = [];
    filesData.value = [];
    errorMessage.value = undefined;
  }

  const createPost = async () => {
    if (post.value === "") {
      errorMessage.value = "Post must not be empty";
      return;
    }

    isLoading.value = true;

    if (filesData.value) {
      for (let i = 0; i <= filesData.value.length - 1; i++) {
        const fileExtension = filesData.value[0].name.split(".").pop();

        const { data, error } = await client.storage
          .from("nuxt-blog-app-storage")
          .upload(`${uuidv4()}.${fileExtension}`, filesData.value[0]);

        if (error) {
          console.log(error.message);
        } else {
          console.log(data);
        }
      }
    }

    const { error } = await useFetch("/api/create-post", {
      method: "POST",
      body: {
        content: post.value,
        authorId: userStore.id,
      },
    });

    if (error.value) {
      toast.add({ title: "An error occurred. Please try again." });
    } else {
      toast.add({ title: "Post created." });
    }

    handleIsOpen(false);
    clearData();
    isLoading.value = false;
  };

  const onChange = (event: Event) => {
    const el = event.target as HTMLInputElement & EventTarget;
    if (el.files) {
      // Limit file upload to three files only
      if ((filesDisplay.value as string[])?.length + el.files.length > 3) {
        alert("Only upload three files");
        return;
      }

      let previewImages = filesDisplay.value;
      let previewFilesData = filesData.value;
      let fileSize = 0;

      for (let i = 0; i <= el.files.length - 1; i++) {
        fileSize += el.files[i].size / 1024 ** 2;
        previewFilesData?.push(el.files[i]);
        previewImages?.push(URL.createObjectURL(el.files[i]));
      }

      // Show alert if file size is greater than 2mb
      if (fileSize > 2) {
        alert("Total file size must be less than 2mb only");
        return;
      }

      filesData.value = previewFilesData;
      filesDisplay.value = previewImages;
    }
  };

  const deleteFile = (fileIndex: number) => {
    filesDisplay.value = filesDisplay.value?.filter((file, i) => {
      return i !== fileIndex;
    }) as string[];

    filesData.value = filesData.value?.filter((file, i) => {
      return i !== fileIndex;
    }) as File[];
  };
</script>
