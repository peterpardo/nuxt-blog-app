<template>
  <UModal
    v-model="isOpen"
    :prevent-close="postStore.loading">
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
            :src="fileDisplay.name"
            class="w-full" />
          <div
            @click="deleteFile(i, fileDisplay.id)"
            class="absolute inset-0 justify-center flex items-center bg-gray-50 bg-opacity-50 opacity-0 w-full h-full hover:opacity-100 cursor-pointer">
            <p class="text-red-500 bg-white rounded px-2 py-1">Delete</p>
          </div>
        </div>
      </div>

      <div
        v-if="postStore.loading"
        class="absolute inset-0 grid place-content-center bg-white bg-opacity-50 \">
        <div class="flex items-center gap-x-2">
          <UIcon
            name="i-heroicons-arrow-path-16-solid"
            dynamic
            class="animate-spin" />
          <template v-if="postStore.config === 'CREATE'">
            Creating post...
          </template>
          <template v-else> Editing post... </template>
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

  type FileDisplay = { id: string | number; name: string };

  const postStore = usePostStore();
  const post = ref("");
  const toast = useToast();
  const files = ref(null); // reference to the input element
  const filesData = ref<File[] | null>([]);
  const errorMessage = ref<string | undefined>("");
  const filesDisplay = ref<FileDisplay[] | null>([]);
  const { isOpen, handleIsOpen } = inject(ModalKey) as Modal;
  const config = useRuntimeConfig();

  const isPostValid = computed(() => post.value.length < 100);

  watchEffect(() => {
    if (!isPostValid.value) {
      errorMessage.value = "Post must be 100 characters below.";
    } else {
      errorMessage.value = undefined;
    }
  });

  watch(
    () => postStore.currentPost,
    (currenPost) => {
      post.value = (currenPost?.content ?? "") as string;
      filesDisplay.value =
        currenPost?.images?.map((img) => ({
          id: img.id,
          name: `${config.public.bucketUrl}/${img.name}`,
        })) ?? [];
    }
  );

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

    postStore.currentPost = null;
    postStore.config = "CREATE";
  }

  const createPost = async () => {
    if (post.value === "") {
      errorMessage.value = "Post must not be empty";
      return;
    }

    let error = null;
    let data = null;
    let message = "";
    if (postStore.config === "CREATE") {
      const { error: createError } = await postStore.createPost(
        post.value,
        filesData.value
      );

      error = createError;
      message = "Post created.";
    } else {
      const { data: editData, error: editError } = await postStore.editPost(
        post.value,
        filesData.value,
        filesDisplay.value
      );

      error = editError;
      data = editData;
      message = "Post edited.";
    }

    if (error.value) {
      toast.add({ title: "An error occurred. Please try again." });
    } else {
      toast.add({ title: message });
    }

    handleIsOpen(false);
    clearData();
  };

  const onChange = (event: Event) => {
    const el = event.target as HTMLInputElement & EventTarget;
    if (el.files) {
      // Limit file upload to three files only
      if ((filesDisplay.value as FileDisplay[])?.length + el.files.length > 3) {
        alert("Only upload three files");
        return;
      }

      let previewImages = JSON.parse(JSON.stringify(filesDisplay.value));
      let previewFilesData = JSON.parse(JSON.stringify(filesData.value));
      let fileSize = 0;

      for (let i = 0; i <= el.files.length - 1; i++) {
        fileSize += el.files[i].size / 1024 ** 2;
        previewFilesData?.push(el.files[i]);
        previewImages?.push({
          id: uuidv4(),
          name: URL.createObjectURL(el.files[i]),
        });
      }

      // Show alert if file size is greater than 2mb
      if (fileSize > 2) {
        alert("Total file size must be less than 2mb only");
      } else {
        filesData.value = previewFilesData;
        filesDisplay.value = previewImages;
      }
    }
  };

  const deleteFile = (fileIndex: number, fileId: string | number) => {
    filesDisplay.value = filesDisplay.value?.filter((file) => {
      return file.id !== fileId;
    }) as FileDisplay[];

    filesData.value = filesData.value?.filter((file, i) => {
      return i !== fileIndex;
    }) as File[];
  };
</script>
