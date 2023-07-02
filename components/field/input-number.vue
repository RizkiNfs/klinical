<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { toRef } from 'vue'
import type { RuleExpression } from 'vee-validate'


export interface Props { 
  name: string 
  label: string
  rules?: RuleExpression<number>
}

const props = defineProps<Props>()

const { value, errorMessage } = useField<number>(toRef(props, 'name') as Ref<string>, props.rules)

</script>

<template>
  <el-form-item 
    :error="errorMessage" 
    :label="label"
  >
    <el-input-number
      :placeholder="label"
      v-model="value"
      v-bind="$attrs"
      :validate-event="false"
      controls-position="right"
    />
  </el-form-item>
</template>
