<template>
  <UModal v-model="isOpen">
    <UCard>
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
            @click="deleteFile(fileDisplay)"
            class="absolute inset-0 justify-center flex items-center bg-gray-50 bg-opacity-50 opacity-0 w-full h-full hover:opacity-100 cursor-pointer">
            <p class="text-red-500 bg-white rounded px-2 py-1">Delete</p>
          </div>
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

  const post = ref("");
  const toast = useToast();
  const files = ref(null);
  const filesDisplay = ref<string[] | null>(null);
  const { isOpen, handleIsOpen } = inject(ModalKey) as Modal;

  const isPostValid = computed(() => post.value.length < 20);

  const errorMessage = computed(
    () => !isPostValid.value && "Post must be 100 characters below."
  );

  const createPost = () => {
    post.value = "";
    handleIsOpen(false);
    filesDisplay.value = null;
    toast.add({ title: "Post created." });
  };

  const onChange = (event: Event) => {
    const el = event.target as HTMLInputElement & EventTarget;
    if (el.files) {
      // Limit file upload to three files only
      if ((filesDisplay.value as string[])?.length + el.files.length > 3) {
        alert("Only upload three files");
        return;
      }

      let previewImages = [];
      let fileSize = 0;
      for (let i = 0; i <= el.files.length - 1; i++) {
        fileSize += el.files[i].size / 1024 ** 2;
        previewImages.push(URL.createObjectURL(el.files[i]));
      }

      // Show alert if file size is greater than 2mb
      if (fileSize > 2) {
        alert("Total file size must be less than 2mb only");
        return;
      }

      filesDisplay.value = previewImages;
    }
  };

  const deleteFile = (file: string) => {
    filesDisplay.value = filesDisplay.value?.filter(
      (filesDisplay) => filesDisplay !== file
    ) as string[];
  };
</script>
