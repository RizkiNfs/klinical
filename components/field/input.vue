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
  rules?: RuleExpression<string>
}

const props = defineProps<Props>()

const { value, errorMessage } = useField<string>(toRef(props, 'name') as Ref<string>, props.rules)

</script>

<template>
  <el-form-item 
    :error="errorMessage" 
    :label="label"
  >
    <el-input
      :placeholder="label"
      v-model="value"
      v-bind="$attrs"
      :validate-event="false"
    />
  </el-form-item>
</template>
