<script lang="ts" setup>
import type { Inventory } from '~/types/model/'

const route = useRoute()
const search = ref('')

const { data: inventories, refetch } = useInventories({
  page: computed(() => Number(route.query.page)),
  searchKey: computed(() => search.value),
})
const { mutateAsync: createInventory } = useCreateInventory()
const { mutateAsync: deleteInventory } = useDeleteInventory()
const { mutateAsync: updateInventory } = useUpdateInventory()

const handleDelete = async (e: Inventory) => {
  await deleteInventory({_id: e._id})
  refetch()
}

const handleCreate = async (inventory: Inventory) => {

  await createInventory({
    name: inventory.name,
    price: Number(inventory.price),
    description: inventory.description,
    stock: Number(inventory.stock)
  })
  refetch()

}

const handleUpdate = async (inventory: Inventory) => {

  await updateInventory({ 
    _id: inventory._id,
    name: inventory.name,
    price: Number(inventory.price),
    description: inventory.description,
    stock: Number(inventory.stock)
  })
  refetch()

}

</script>

<template>
  <div>
    <data-table
      name="Persediaan"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      @search="search = $event"
      :data="inventories?.data"
      :meta="{ total: inventories?.meta?.total as number }"
      :columns="[
        { prop: 'name', label: 'Nama' },
        { prop: 'price', label: 'Harga', align: 'right', width: 220 },
        { prop: 'stock', label: 'Stok', align: 'right', width: 120 },
        { prop: 'description', label: 'Keterangan' },
      ]"
    >
      <template #column-price="item">
        {{ decimalSeparator(item.price) }}
      </template>
      <template #column-stock="item">
        {{ decimalSeparator(item.stock) }}
      </template>
      <template #form>
        <form-inventory />
      </template>
    </data-table>
  </div>
</template>