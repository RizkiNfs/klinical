<script setup>
import 'dayjs/locale/id'
import locale from 'element-plus/dist/locale/id.min.mjs'
</script>

<template>
  <el-config-provider
    size="large"
    :locale="locale"
  >
    <NuxtPage />
  </el-config-provider>
</template>
