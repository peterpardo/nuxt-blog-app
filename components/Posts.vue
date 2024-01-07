<template>
  <div class="mt-2 space-y-5">
    <PostSkeleton v-if="postStore.loading" />

    <template v-else>
      <Post
        v-for="post in postStore.list"
        :post="post"
        :key="post.id" />
    </template>
  </div>
</template>

<script setup lang="ts">
  const postStore = usePostStore();

  const posts = ref([
    {
      id: 1,
      user: {
        id: 51,
        name: "John Doe",
        profilePicture: "https://placekitten.com/200/300",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      images: [
        "https://images.pexels.com/photos/16794803/pexels-photo-16794803/free-photo-of-building-on-a-pier.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/10033269/pexels-photo-10033269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/19282452/pexels-photo-19282452/free-photo-of-flock-of-birds-on-clear-sky-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
    },
    {
      id: 2,
      user: {
        id: 51,
        name: "Stan Smith",
        profilePicture: "https://placekitten.com/201/300",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      images: [
        "https://images.pexels.com/photos/16794803/pexels-photo-16794803/free-photo-of-building-on-a-pier.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/10033269/pexels-photo-10033269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/19282452/pexels-photo-19282452/free-photo-of-flock-of-birds-on-clear-sky-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
    },
    {
      id: 3,
      user: {
        id: 51,
        name: "Mary Jane",
        profilePicture: "https://placekitten.com/202/300",
      },
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      images: [
        "https://images.pexels.com/photos/16794803/pexels-photo-16794803/free-photo-of-building-on-a-pier.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/10033269/pexels-photo-10033269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/19282452/pexels-photo-19282452/free-photo-of-flock-of-birds-on-clear-sky-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
    },
  ]);

  postStore.fetchPosts();
</script>
