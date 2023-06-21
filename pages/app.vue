<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <NuxtLayout name="app">
    <NuxtPage />
  </NuxtLayout>
</template>
