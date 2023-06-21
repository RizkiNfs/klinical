<script lang="ts" setup>
import type { Patient } from '~/types/model/patient'

const route = useRoute()
const search = ref('')

const { data: patient, refetch } = usePatients({
  page: computed(() => Number(route.query.page)),
  searchKey: computed(() => search.value),
})
const { mutateAsync: createPatient } = useCreatePatient()
const { mutateAsync: deletePatient } = useDeletePatient()
const { mutateAsync: updatePatient } = useUpdatePatient()

const handleDelete = async (e: Patient) => {
  await deletePatient({_id: e._id})
  refetch()
}

const handleCreate = async (p: Patient) => {

  await createPatient({
    name: p.name,
    phone: p.phone,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    address: p.address,
  })
  refetch()

}

const handleUpdate = async (p: Patient) => {

  await updatePatient({ 
    _id: p._id,
    name: p.name,
    phone: p.phone,
    dateOfBirth: p.dateOfBirth,
    gender: p.gender,
    address: p.address,
  })
  refetch()

}

</script>

<template>
  <div>
    <data-table
      name="Pasien"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      @search="search = $event"
      :data="patient?.data"
      :meta="{ total: patient?.meta?.total as number }"
      :columns="[
        { prop: 'phone', label: 'Phone' },
        { prop: 'name', label: 'Name' },
        { prop: 'address', label: 'Address' },
      ]"
    >
      <template #form>
        <form-patient />
      </template>
    </data-table>
  </div>
</template>