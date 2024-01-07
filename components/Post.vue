<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-x-4">
        <UAvatar
          src="https://placekitten.com/200/300"
          :alt="props.post.userId" />

        <div>
          <h1>{{ props.post.userId }}</h1>
          <p class="text-gray-400 text-xs">1 hr ago</p>
        </div>
      </div>
    </template>

    <h1>
      {{ props.post.title }}
    </h1>
    <p class="text-sm">
      {{ props.post.body }}
    </p>
  </UCard>
</template>

<script setup lang="ts">
  import type { Post } from "~/types";
  const props = defineProps<{
    post: any;
  }>();
</script>
