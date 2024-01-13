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

    <div class="flex items-center justify-between">
      <img
        v-for="image in props.post.images"
        :key="image.id"
        :src="`${config.public.bucketUrl}/${image.name}`"
        alt="image"
        class="w-40"
        loading="lazy" />
    </div>
  </UCard>
</template>

<script setup lang="ts">
  import type { PostWithUser } from "~/types";
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);

  const config = useRuntimeConfig();

  const formatCreatedAt = (createdAt: Date) => {
    return dayjs().to(dayjs(createdAt));
  };

  const props = defineProps<{
    post: PostWithUser;
  }>();
</script>
