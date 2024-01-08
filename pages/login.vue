<template>
  <UContainer class="h-screen grid place-items-center">
    <UCard
      class="max-w-md w-full"
      :ui="{
        body: { base: 'space-y-5' },
      }">
      <div class="flex flex-col justify-center items-center gap-y-4">
        <TheLogo />
      </div>

      <div class="text-center hover:text-primary">
        <UButton
          variant="outline"
          color="black"
          @click="signInWithOAuth">
          <UIcon
            name="i-mdi-github"
            dynamic
            class="text-xl" />
          Sign in with Github
        </UButton>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
  const supabase = useSupabaseClient();
  const config = useRuntimeConfig();

  const signInWithOAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: config.public.apiBase,
      },
    });
    if (error) console.log(error);
  };
</script>
