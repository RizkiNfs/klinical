<script setup lang="ts">
defineProps<{
  data?: {_id: string, total: number}[]
  total: number
  label: string
}>()
</script>

<template>
  <el-table
    size="large"
    :data="data"
  >
    <el-table-column
      prop="_id"
      :label="label"
      width="280"
    />
    <el-table-column
      prop="total"
      label=""
      width="280"
      align="right"
    >
      <template #default="item">
        {{ decimalSeparator(item.row.total) }}
      </template>
    </el-table-column>
    <el-table-column
      prop="x"
      label=""
    />
    <template #append>
      <div class="flex text-base font-semibold">
        <p class="w-[280px] p-4 " />
        <p class="w-[280px] p-4 text-right">
          {{ decimalSeparator(total) }}
        </p>
      </div>
    </template>
  </el-table>
</template>