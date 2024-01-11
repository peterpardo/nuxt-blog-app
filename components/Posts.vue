<template>
  <div class="mt-2 space-y-5">
    <div class="flex items-center justify-end">
      <UDropdown
        :items="items"
        :popper="{ placement: 'bottom-end' }">
        <UButton
          color="white"
          :label="filterLabel"
          trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
    </div>

    <PostSkeleton v-if="postStore.loading" />

    <template v-else>
      <div
        v-if="postStore.list?.length === 0"
        class="text-center py-10 space-y-5">
        <h1 class="font-semibold text-gray-500">No Posts available</h1>
        <div>
          <UButton @click="postStore.fetchPosts"
            ><UIcon
              name="i-material-symbols-refresh"
              class="text-xl"
              dynamic />
            Refresh Page
          </UButton>
        </div>
      </div>

      <template v-else>
        <Post
          v-for="post in postStore.list"
          :post="post"
          :key="post.id" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
  const postStore = usePostStore();
  const filterLabel = ref("All Posts");

  postStore.fetchPosts();

  const items = [
    [
      {
        label: "All Posts",
        click: () => {
          filterLabel.value = "All Posts";
          postStore.fetchPosts();
        },
      },
      {
        label: "My Posts",
        click: () => {
          filterLabel.value = "My Posts";
          postStore.fetchPosts(true);
        },
      },
    ],
  ];
</script>
