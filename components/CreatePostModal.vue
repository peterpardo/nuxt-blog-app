<template>
  <UModal v-model="props.isOpen">
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
  const props = defineProps<{ isOpen: boolean }>();
  const emit = defineEmits(["handle-modal"]);

  const post = ref("");
  const toast = useToast();

  const isPostValid = computed(() => post.value.length < 20);

  const errorMessage = computed(
    () => !isPostValid.value && "Post must be 20 characters below."
  );

  const createPost = () => {
    post.value = "";
    emit("handle-modal", false);
    toast.add({ title: "Post created." });
  };
</script>
