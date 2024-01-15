<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center">
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

        <UDropdown
          v-if="userStore.id === props.post.authorId"
          :items="items"
          :popper="{ offsetDistance: 0, placement: 'bottom-end' }">
          <UButton
            color="gray"
            variant="ghost">
            <UIcon
              name="heroicons:ellipsis-vertical-16-solid"
              dynamic />
          </UButton>

          <template #item="{ item }">
            <div
              class="flex w-full items-center justify-between"
              @click="handlePost(props.post.id, item.label)">
              <span>{{ item.label }}</span>

              <UIcon
                :name="item.icon"
                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
            </div>
          </template>
        </UDropdown>
      </div>
    </template>

    {{ props.post.content }}

    <div class="flex items-center justify-center gap-x-5 mt-5">
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

  const userStore = useUserStore();
  const config = useRuntimeConfig();

  const items = [
    [
      {
        label: "Edit",
        icon: "i-heroicons-pencil-square-20-solid",
      },
      {
        label: "Delete",
        icon: "i-heroicons-trash-20-solid",
      },
    ],
  ];

  const formatCreatedAt = (createdAt: Date) => {
    return dayjs().to(dayjs(createdAt));
  };

  const props = defineProps<{
    post: PostWithUser;
  }>();

  function handlePost(postId: number, label: string) {
    if (label === "Delete") {
      console.log("Delete Post: ", postId);
    } else {
      console.log("Edit Post: ", postId);
    }
  }
</script>
