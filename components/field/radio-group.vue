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

const { value, errorMessage } = useField<string>(toRef(props, 'name'), props.rules, {
  type: 'radio',
})

</script>

<template>
  <el-form-item
    :error="errorMessage"
    :label="label"
  >
    <el-radio-group
      v-bind="$attrs"
      v-model="value"
    >
      <slot />
    </el-radio-group>
  </el-form-item>
</template>
