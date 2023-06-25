<script lang="ts" setup>
import type { Transaction } from '~/types/model/'

const route = useRoute()
const search = ref('')

const { data: transaction, refetch } = useTransactions({
  page: computed(() => Number(route.query.page)),
  searchKey: computed(() => search.value),
})
const { mutateAsync: createTransaction } = useCreateTransaction()
const { mutateAsync: deleteTransaction } = useDeleteTransaction()
const { mutateAsync: updateTransaction } = useUpdateTransaction()

const handleDelete = async (e: Transaction) => {
  await deleteTransaction({_id: e._id})
  refetch()
}

const handleCreate = async (transaction: Transaction) => {

  await createTransaction({
    ...transaction,
    inventories: transaction.inventories?.map((i) => ({
      ...i,
      count: Number(i.count),
    })),
  })
  refetch()

}

const handleUpdate = async (transaction: Transaction) => {

  await updateTransaction({
    ...transaction,
    inventories: transaction.inventories?.map((i) => ({
      ...i,
      count: Number(i.count),
    })),
  })
  refetch()

}


</script>

<template>
  <div>
    <data-table
      name="Transaksi"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      @search="search = $event"
      :data="transaction?.data"
      :meta="{ total: transaction?.meta?.total as number }"
      :columns="[
        { prop: 'createdAt', label: 'Waktu', width: 160 },
        { prop: 'patient', label: 'Pasien', width: 160 },
        { prop: 'price', label: 'Total', align: 'right', width: 160 },
        { prop: 'services', label: 'Layanan', align: 'right', width: 160 },
        { prop: 'inventories', label: 'Barang', align: 'right', width: 160 },
        { prop: 'description', label: 'Keterangan', width: 160 },
      ]"
    >
      <template #column-createdAt="item">
        {{ dayjs(item.createdAt).format('D MMM YYYY, HH:mm') }}
      </template>
      <template #column-patient="item">
        {{ item.patient.name }} - {{ item.patient.phone }}
      </template>
      <template #column-price="item">
        {{ decimalSeparator(item.price) }}
      </template>
      <template #column-services="item">
        <ul>
          <li
            v-for="(s, idx) of item.services"
            :key="idx"
          >
            {{ s.name }} - {{ decimalSeparator(s.price) }}
          </li>
        </ul>
      </template>
      <template #column-inventories="item">
        <ul>
          <li
            v-for="(s, idx) of item.inventories"
            :key="idx"
          >
            {{ s.name }} - {{ decimalSeparator(s.price) }}
          </li>
        </ul>
      </template>
      <template #form="{values}">
        <form-transaction />
        <p class="mb-4">
          Total: 
          <span class="font-bold text-xl">
            {{ decimalSeparator(sumTransaction(toRaw(values))) }}
          </span>
        </p>
      </template>
    </data-table>
  </div>
</template>