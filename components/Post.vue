<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-x-4">
        <UAvatar
          :src="props.post.user.profilePicture"
          :alt="props.post.user.name" />

        <div>
          <h1>{{ props.post.user.name }}</h1>
          <p class="text-gray-400 text-xs">1 hr ago</p>
        </div>
      </div>
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
