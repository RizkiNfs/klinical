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
  rules?: RuleExpression<string>
}

const props = defineProps<Props>()

const { value, errorMessage } = useField<string>(toRef(props, 'name'), props.rules)

</script>

<template>
  <el-form-item
    :error="errorMessage"
    :label="label"
  >
    <el-date-picker
      v-bind="$attrs"
      v-model="value"
    />
  </el-form-item>
</template>
