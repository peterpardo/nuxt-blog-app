<template>
  <nav
    class="sticky top-0 z-10 bg-white bg-opacity-80 flex items-center justify-between py-4">
    <div class="flex items-center gap-x-2">
      <TheLogo @click="scrollToTop" />
      <UButton
        v-if="userStore.id"
        @click="isOpen = !isOpen"
        >Create Post</UButton
      >
    </div>
    <div>
      <div class="flex items-center">
        <UButton
          v-if="!userStore.id"
          variant="ghost"
          to="/login"
          >Login</UButton
        >
        <UDropdown
          v-else
          :items="items"
          :ui="{ item: { disabled: 'cursor-text select-text' } }">
          <template #account="{ item }">
            <div class="text-left">
              <p>{{ item.label }}</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ userStore.email }}
              </p>
            </div>
          </template>
          <UAvatar
            :src="userStore.avatar"
            :alt="userStore.name"
            size="md"
            class="cursor-pointer" />
        </UDropdown>
      </div>
    </div>
  </nav>

  <CreatePostModal />
</template>

<script setup lang="ts">
  import { ModalKey } from "~/symbols";

  const userStore = useUserStore();
  const isOpen = ref(false);

  const items = [
    [
      {
        label: "Signed in as",
        slot: "account",
        disabled: true,
      },
    ],
    [
      {
        label: "Sign out",
        icon: "i-heroicons-arrow-left-on-rectangle",
        click: userStore.signOutUser,
      },
    ],
  ];

  const handleIsOpen = (value: boolean) => {
    isOpen.value = value;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  provide(ModalKey, {
    isOpen,
    handleIsOpen,
  });
</script>
