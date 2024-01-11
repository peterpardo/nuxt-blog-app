<template>
  <div class="mt-2 space-y-5">
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

  postStore.fetchPosts();
</script>
