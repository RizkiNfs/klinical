<script setup lang="ts">
import IncomeTable from './table.vue'

const month = ref(new Date())

const { data } = useIncomeAndCost({ date: month })

const totalIncome = computed(() => data.value?.income?.reduce((acc,i) => acc + i.total, 0) || 0)
const totalCost = computed(() => data.value?.cost?.reduce((acc,i) => acc + i.total, 0) || 0)
const revenue = computed(() => totalIncome.value - totalCost.value)

</script>

<template>
  <div class="mb-6">
    <el-date-picker
      v-model="month" 
      placeholder="Pilih bulan" 
      type="month"
      format="MMMM YYYY"
    />
  </div>
  <income-table 
    :data="data?.income"
    :total="totalIncome" 
    label="Pendapatan" 
  />
  <income-table 
    :data="data?.cost"
    :total="totalCost" 
    label="Pengeluaran" 
  />
  <div class="flex mt-4 text-xl font-semibold">
    <p class="w-[280px] p-4">
      {{ revenue >= 0 ? 'Laba' : 'Rugi' }}
    </p>
    <p class="w-[280px] p-4 text-right">
      {{ decimalSeparator(revenue) }}
    </p>
  </div>
</template>