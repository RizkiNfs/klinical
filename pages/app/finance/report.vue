<script lang="ts" setup>
import { ref } from 'vue'

const tabs = [
  { label: 'Laba Rugi', component: resolveComponent('finance-report-income') },
  { label: 'Neraca', component: resolveComponent('finance-report-ballance-sheet') },
  { label: 'Arus Kas', component: resolveComponent('finance-report-cash-flow') },
  { label: 'Perubahan Modal', component: resolveComponent('finance-report-retained-earning') },
]

const activeName = ref(tabs[0].label)

</script>

<template>
  <div>
    <el-tabs
      v-model="activeName"
      class=""
    >
      <el-tab-pane
        v-for="tab of tabs"
        :label="tab.label" 
        :name="tab.label"
        :key="tab.label"
        lazy
      >
        <component :is="tab.component" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>