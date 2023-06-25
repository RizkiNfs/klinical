<script setup lang="ts">

export interface Props { 
  name: string
  label?: string
  title?: string
  initialValue?: unknown
}

const {
  initialValue = ''
} = defineProps<Props>()

defineSlots<{
  default(p: { index: number }): any
}>()

const handleAdd = (push: (value: any) => void) => {
  if(Array.isArray(initialValue)) {
    return push([...initialValue])
  }

  if(typeof initialValue === 'object') {
    return push({...initialValue})
  }

  return push(initialValue)

}

</script>

<template>
  <div class="flex flex-col">
    <div>
      <p
        v-if="title"
        class="el-form-item__label"
      >
        {{ title }}
      </p>
    </div>
    <vee-field-array
      :name="name"
      v-slot="{ fields, push, remove }"
    >
      <div
        class="flex gap-x-4"
        v-for="(entry, idx) in fields"
        :key="entry.key"
      >
        <slot :index="idx" />
        <el-button
          type="danger"
          plain
          circle
          @click="remove(idx)"
        >
          <Icon
            class="text-xl"
            name="solar:trash-bin-trash-bold-duotone"
          />
        </el-button>
      </div>
      <el-button 
        class="mb-4" 
        @click="handleAdd(push)"
      >
        + Tambah {{ label }}
      </el-button>
    </vee-field-array>
  </div>
</template>
