<template>
  <nav
    class="sticky top-0 z-10 bg-white bg-opacity-80 flex items-center justify-between py-4">
    <div class="flex items-center gap-x-2">
      <TheLogo @click="scrollToTop" />
      <UButton
        v-if="user"
        @click="isOpen = !isOpen"
        >Create Post</UButton
      >
    </div>
    <div>
      <div class="flex items-center">
        <UButton
          v-if="!user"
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
              <p>Signed in as</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ item.label }}
              </p>
            </div>
          </template>
          <UAvatar
            :src="user?.user_metadata.avatar_url"
            :alt="user?.user_metadata.user_name"
            size="md"
            class="cursor-pointer" />
        </UDropdown>
      </div>
    </div>
  </nav>

  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h1 class="text-xl text-primary font-semibold">Create Post</h1>
      </template>

      <UFormGroup
        label="What is on your mind?"
        :error="errorMessage">
        <UTextarea
          autoresize
          v-model="post"
          placeholder="Content here..." />
      </UFormGroup>

      <template #footer>
        <div class="flex">
          <UButton
            :disabled="!isPostValid"
            class="ml-auto"
            @click="createPost"
            :variant="!isPostValid ? 'outline' : 'solid'"
            >Post</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
  import type { User } from "@supabase/supabase-js";

  const user = ref<User | null>(null);
  const supabase = useSupabaseClient();
  const isOpen = ref(false);
  const post = ref("");
  const toast = useToast();

  const isPostValid = computed(() => post.value.length < 20);

  const errorMessage = computed(
    () => !isPostValid.value && "Post must be 20 characters below."
  );

  const items = [
    [
      {
        label: user?.value?.email as string,
        slot: "account",
        disabled: true,
      },
    ],
    [
      {
        label: "Sign out",
        icon: "i-heroicons-arrow-left-on-rectangle",
        click: signOut,
      },
    ],
  ];

  onMounted(() => {
    const currentUser = useSupabaseUser();
    user.value = currentUser.value;
  });

  const createPost = () => {
    post.value = "";
    isOpen.value = false;
    toast.add({ title: "Post created." });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    user.value = null;
    if (error) console.log(error);
  }
</script>
