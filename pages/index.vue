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
  const user = useSupabaseUser();
  const userStore = useUserStore();

  userStore.getCurrentUser(user);
</script>
