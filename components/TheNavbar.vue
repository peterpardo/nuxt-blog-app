<template>
  <nav
    class="sticky top-0 z-10 bg-white bg-opacity-80 flex items-center justify-between py-4">
    <div
      class="flex items-center gap-x-2 font-semibold text-primary cursor-pointer"
      @click="scrollToTop">
      <UIcon
        name="i-material-symbols-note-alt"
        class="text-2xl"
        dynamic />
      <h1>Le Bloge</h1>
    </div>

    <div>
      <UButton @click="isOpen = !isOpen">Create Post</UButton>
    </div>
  </nav>

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
  const isOpen = ref(false);
  const post = ref("");
  const toast = useToast();

  const isPostValid = computed(() => post.value.length < 20);

  const errorMessage = computed(
    () => !isPostValid.value && "Post must be 20 characters below."
  );

  const createPost = () => {
    post.value = "";
    isOpen.value = false;
    toast.add({ title: "Post created." });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
</script>
