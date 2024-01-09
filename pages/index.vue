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

  watch(user, async () => {
    if (!user.value) return;

    const { data } = await useFetch(`/api/get-user/${user?.value?.id}`);

    if (!data.value) {
      const { data } = await useFetch(`/api/create-user`, {
        method: "POST",
        body: {
          userId: user.value?.id,
          name: user.value?.user_metadata.name,
          email: user.value?.email,
          avatar: user.value?.user_metadata.avatar_url,
        },
      });

      console.log("User Created!", data.value);
    }
  });
</script>
