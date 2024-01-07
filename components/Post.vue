<template>
  <UCard>
    <template #header>
      <h1>User 1</h1>
    </template>

    {{ props.post.content }}
  </UCard>
</template>

<script setup lang="ts">
  import type { Post } from "~/types";
  const props = defineProps<{
    post: Post;
  }>();
</script>
