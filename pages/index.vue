<script setup lang="ts">

definePageMeta({
  middleware: () => {
    const token = useCookie('token')
    if(token.value) {
      return navigateTo('/app')
    }
  }
})

</script>

<template>
  <div class="flex h-screen">
    <div class="w-1/2 h-full bg-teal-50" />
    <div class="w-1/2 h-full flex items-center justify-center">
      <div class="w-[480px]">
        <form-login />
      </div>
    </div>
  </div>
</template>