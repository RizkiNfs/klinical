<script lang="ts" setup>
import type { Service } from '~/types/model/'

const route = useRoute()
const search = ref('')

const { data: patient, refetch } = useServices({
  page: computed(() => Number(route.query.page)),
  searchKey: computed(() => search.value),
})
const { mutateAsync: createService } = useCreateService()
const { mutateAsync: deleteService } = useDeleteService()
const { mutateAsync: updateService } = useUpdateService()

const handleDelete = async (e: Service) => {
  await deleteService({_id: e._id})
  refetch()
}

const handleCreate = async (service: Service) => {

  await createService({
    name: service.name,
    price: Number(service.price),
    description: service.description,
  })
  refetch()

}

const handleUpdate = async (service: Service) => {

  await updateService({ 
    _id: service._id,
    name: service.name,
    price: Number(service.price),
    description: service.description,
  })
  refetch()

}

</script>

<template>
  <div>
    <data-table
      name="Layanan"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      @search="search = $event"
      :data="patient?.data"
      :meta="{ total: patient?.meta?.total as number }"
      :columns="[
        { prop: 'name', label: 'Nama' },
        { prop: 'price', label: 'Harga', align: 'right', width: 220 },
        { prop: 'description', label: 'Keterangan' },
      ]"
    >
      <template #column-price="item">
        {{ decimalSeparator(item.price) }}
      </template>
      <template #form>
        <form-service />
      </template>
    </data-table>
  </div>
</template>