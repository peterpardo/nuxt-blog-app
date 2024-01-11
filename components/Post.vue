<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-x-4">
        <UAvatar
          :src="props.post.author.avatar"
          :alt="props.post.author.name" />

        <div>
          <h1>{{ props.post.author.name }}</h1>
          <p class="text-gray-400 text-xs">
            {{ formatCreatedAt(props.post.createdAt) }}
          </p>
        </div>
      </div>
    </template>

    {{ props.post.content }}
  </UCard>
</template>

<script setup lang="ts">
  import type { PostWithUser } from "~/types";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);

  const formatCreatedAt = (createdAt: Date) => {
    return dayjs().to(dayjs(createdAt));
  };

  const props = defineProps<{
    post: PostWithUser;
  }>();
</script>
