<script lang="ts" setup>
import { ref } from 'vue'

const tabs = [
  { label: 'Laba Rugi' },
  { label: 'Nerace' },
  { label: 'Arus Kas' },
  { label: 'Perubahan Modal' },
]

const activeName = ref(tabs[0].label)

</script>

<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane
        v-for="tab of tabs"
        :label="tab.label" 
        :name="tab.label"
        lazy
      >
        {{ tab.label }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>