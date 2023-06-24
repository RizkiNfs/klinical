<script setup lang="ts">

import { Dayjs } from 'dayjs'
import type { SubmissionHandler } from 'vee-validate'
import { useCreateReservation } from '~/composables/services/reservation'
import { Patient, Reservation } from '~/types/model'

const emit = defineEmits<{
  (e:'update:show'): void
  (e:'update:selectedReservation'): void
  (e:'success-update', data?: Partial<Reservation>): void
}>()

const props = defineProps<{
  show?: boolean
  selectedDate?: Date | Dayjs
  'selectedReservation'?: Reservation | null
}>()

const show = useVModel(props, 'show', emit)
const selectedReservation = useVModel(props, 'selectedReservation', emit)


const { mutateAsync: createReservation } = useCreateReservation()
const { mutateAsync: updateReservation } = useUpdateReservation()
const { mutateAsync: deleteReservation } = useDeleteReservation()

const handleClose = () => {
  show.value = false
  selectedReservation.value = null
}

const handleSubmit: SubmissionHandler = async (values) => {
  const description: string = values.description
  const patient: Patient = JSON.parse(values.patient)
  const date = values.date as Date
  const data = {
    _id: values._id,
    date,
    description,
    patient: {
      name: patient.name,
      phone: patient.phone
    }
  }
  if(!selectedReservation.value) {
    delete data._id
    await createReservation(data)
  } else {
    await updateReservation(data)
  }

  emit('success-update', data)

  selectedReservation.value = null
  show.value = false
}

const handleDelete = async () => {

  await ElMessageBox.confirm(
    'Yakin hapus data reservasi ?',
    '',
    {
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      type: 'warning',
    }
  )

  if(selectedReservation.value) {
    await deleteReservation({
      _id: selectedReservation.value._id
    })
    emit('success-update')
    selectedReservation.value = null
    show.value = false
  }

}

const searchKey = ref('')
const { data: patients, isLoading } = usePatients({ searchKey })

const searchPatient = (query: string) => {
  searchKey.value = query
}

const ElForm = resolveComponent('el-form') as string

</script>

<template>
  <el-drawer 
    v-model="show"
    direction="rtl"
    class="min-w-[80%] lg:min-w-[640px]"
    :close-on-click-modal="false"
  >
    <template #header>
      <h3
        v-if="selectedReservation"
        class="text-lg font-semibold"
      >
        Update Reservasi
      </h3>
      <h3
        v-else
        class="text-lg font-semibold"
      >
        Tambah Reservasi Baru
      </h3>
    </template>
    <el-scrollbar>
      <vee-form
        v-if="show"
        ref="formRef"
        label-position="top"
        status-icon
        :as="ElForm"
        :initial-values="{
          date: props.selectedDate,
          ...(selectedReservation || {}),
          ...(selectedReservation ? {patient: JSON.stringify({
            name: selectedReservation.patient.name, phone: selectedReservation.patient.phone
          })} : {})
        }"
        @submit="handleSubmit"
      >
        <field-date-picker 
          class="w-full" 
          name="date" 
          label="Tanggal" 
          placeholder="Pilih Tanggal"
          format="dddd, D MMM YY, HH:mm"
          type="datetime"
        />
        <field-select 
          class="w-full"
          name="patient"
          label="Pasien"
          placeholder="Masukan nama atau kontak"
          filterable
          remote
          remote-show-suffix
          :remote-method="searchPatient"
          :loading="isLoading"
        >
          <el-option
            v-for="patient in patients?.data"
            :key="patient._id"
            :label="`${patient.name} - ${patient.phone}`"
            :value="JSON.stringify({name: patient.name, phone: patient.phone})"
          />
        </field-select>
        <field-input
          name="description"
          label="Keterangan"
          type="textarea"
        />
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
          >
            <Icon
              class="mr-2 text-lg"
              name="solar:document-add-bold-duotone"
            />
            Simpan
          </el-button>
          <el-button @click="handleClose">
            Batal
          </el-button>
          <el-button
            v-if="selectedReservation"
            @click="handleDelete"
            type="danger"
          >
            Hapus
          </el-button>
        </el-form-item>
      </vee-form>
    </el-scrollbar>
  </el-drawer>
</template>