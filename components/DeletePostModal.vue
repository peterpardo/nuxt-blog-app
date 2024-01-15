<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h1 class="text-xl text-primary font-semibold">Delete Post</h1>
      </template>

      Are you sure you want to delete this post?

      <div
        v-if="postStore.loading"
        class="absolute inset-0 grid place-content-center bg-white bg-opacity-50 \">
        <div class="flex items-center gap-x-2">
          <UIcon
            name="i-heroicons-arrow-path-16-solid"
            dynamic
            class="animate-spin" />

          Deleting post...
        </div>
      </div>

      <template #footer>
        <div class="flex">
          <UButton
            color="red"
            class="ml-auto"
            @click="deletePost"
            >Yes, delete.</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  const props = defineProps<{
    isOpen: boolean;
    selectedPost: number | null;
  }>();
  const emit = defineEmits(["close-modal"]);

  const postStore = usePostStore();
  const toast = useToast();
  const isOpen = ref(props.isOpen);

  watch(
    () => props.isOpen,
    (newValue, oldVal) => {
      isOpen.value = newValue;
    }
  );

  watch(isOpen, () => {
    if (!isOpen.value) {
      emit("close-modal");
    }
  });

  async function deletePost() {
    const { error } = await postStore.deletePost(props.selectedPost);

    if (error.value) {
      toast.add({ title: error.value.message });
    } else {
      toast.add({ title: "Post deleted." });
    }

    isOpen.value = false;
  }
</script>
