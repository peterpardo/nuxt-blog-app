<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h1 class="text-xl text-primary font-semibold">Delete Post</h1>
      </template>

      Are you sure you want to delete this post?

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

  function deletePost() {
    console.log("Confirm deleting post: ", props.selectedPost);
    isOpen.value = false;
    toast.add({ title: "Post deleted." });
  }
</script>
