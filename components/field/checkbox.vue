<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
import { toRef } from 'vue'
import type { RuleExpression } from 'vee-validate'


export interface Props { 
  name: string 
  label: string
  rules?: RuleExpression<boolean>
}

const props = defineProps<Props>()

const { value, errorMessage } = useField<boolean>(toRef(props, 'name'), props.rules, {
  type: 'checkbox',
  valueProp: true,
  uncheckedValue: false,
})
</script>

<template>
  <el-form-item :error="errorMessage">
    <el-checkbox
      v-bind="$attrs"
      v-model="value"
    >
      {{ label }}
    </el-checkbox>
  </el-form-item>
</template>
