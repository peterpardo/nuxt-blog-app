<template>
  <nav class="flex items-center justify-between py-4">
    <div class="font-semibold text-amber-900">Coffee</div>

    <div>
      <UButton @click="isOpen = !isOpen">Create Post</UButton>
    </div>
  </nav>

  <UModal v-model="isOpen">
    <UCard>
      <template #header> Create Post </template>

      <UFormGroup
        label="What is on your mind?"
        :error="errorMessage">
        <UTextarea
          autoresize
          v-model="post"
          placeholder="Content here..." />
      </UFormGroup>

      <template #footer>
        <div class="flex">
          <UButton
            class="ml-auto"
            @click="createPost"
            >Post</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  const isOpen = ref(false);
  const post = ref("");
  const toast = useToast();

  const errorMessage = computed(
    () => post.value.length > 20 && "Post must be 20 characters below."
  );

  const createPost = () => {
    post.value = "";
    isOpen.value = false;
    toast.add({ title: "Post created." });
  };
</script>
