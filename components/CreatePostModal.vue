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

      <UFormGroup class="mt-2">
        <template #label>
          <div
            class="flex items-center gap-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
            <UIcon
              name="i-mdi-paperclip"
              dynamic />
            Upload File/s
          </div>
        </template>

        <template #default>
          <UInput
            type="file"
            ref="file"
            @change="onChange"
            accept=".jpg,.jpeg,.png" />
        </template>
      </UFormGroup>

      <div v-if="fileDisplay">
        <img
          :src="fileDisplay"
          class="mx-auto w-full mt-2 mr-2 rounded-lg" />
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
  const file = ref(null);
  const fileDisplay = ref<string | null>(null);
  const { isOpen, handleIsOpen } = inject(ModalKey) as Modal;

  const isPostValid = computed(() => post.value.length < 20);

  const errorMessage = computed(
    () => !isPostValid.value && "Post must be 20 characters below."
  );

  const createPost = () => {
    post.value = "";
    handleIsOpen(false);
    toast.add({ title: "Post created." });
  };

  const onChange = (event: Event) => {
    const el = event.target as HTMLInputElement & EventTarget;
    if (el.files) {
      fileDisplay.value = URL.createObjectURL(el.files[0]);
    }
  };
</script>
