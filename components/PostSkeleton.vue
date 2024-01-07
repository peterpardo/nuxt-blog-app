<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-x-4">
        <USkeleton
          class="h-12 w-12"
          :ui="{ rounded: 'rounded-full' }" />

        <div class="space-y-3">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[100px]" />
        </div>
      </div>
    </template>

    <div class="space-y-3">
      <USkeleton class="h-4 w-[200px]" />
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[150px]" />
    </div>
  </UCard>
</template>

<script setup lang="ts"></script>
