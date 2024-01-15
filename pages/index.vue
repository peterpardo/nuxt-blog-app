<template>
  <UContainer
    :ui="{
      constrained: 'max-w-2xl',
    }">
    <TheNavbar />
    <Posts />
  </UContainer>
</template>

<script setup lang="ts">
  import { ModalKey } from "~/symbols";

  const user = useSupabaseUser();
  const userStore = useUserStore();

  const isOpen = ref(false);

  userStore.getCurrentUser(user);

  const handleIsOpen = (value: boolean) => {
    isOpen.value = value;
  };

  provide(ModalKey, {
    isOpen,
    handleIsOpen,
  });
</script>
