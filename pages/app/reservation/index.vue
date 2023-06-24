<script setup lang="ts">
import { Dayjs } from 'dayjs'
import { useReservations } from '~/composables/services/reservation'
import type { Reservation } from '~/types/model'
import { dayjs } from '~/utils/date'

const length = 4

const startDate = ref<Date>(new Date())
const endDate = computed(() => new Date(dayjs(startDate.value).add(length, 'day').toString()))

const { data: reservations, refetch } = useReservations({
  startDate,
  endDate
})

const { mutate: updateReservation } = useUpdateReservation()

const temp = ref(reservations.value?.data)
watch(reservations, (newValue) => {
  temp.value = newValue?.data
})

const data = computed(() => {
  return Array.from({ length }).map((_, index) => {
    const date = dayjs(startDate.value).add(index, 'day')
    return {
      date,
      items: temp.value?.filter((i) => {
        return dayjs(i.date).isSame(date, 'date')
      }).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }
  })
})


const showForm = ref(false)
const selectedDate = ref(new Date())

const handleAdd = (date: Date|Dayjs) => {
  showForm.value = true
  selectedDate.value = new Date(date.toString())
}

const handleDrag = (event: DragEvent, _id: string) => {
  if(event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('_id', _id)
  }

}

const handleDrop = (event: DragEvent, date: Dayjs) => {

  if(event.dataTransfer && reservations.value?.data) {
    const _id = event.dataTransfer.getData('_id')
    temp.value = reservations.value?.data.map((i) => {
      if(i._id === _id && !dayjs(i.date).isSame(date, 'date')) {
        const currentDate = dayjs(i.date)
        const data  = { ...i, date: date.hour(currentDate.get('hour')).minute(currentDate.get('minute')).toISOString() }
        updateReservation(data)
        return data
      }
      return i
    })
  }

}

const handleChangeStartDate = (add: number) => {
  startDate.value = new Date(dayjs(startDate.value).add(add, 'day').toString())
}

const selectedReservation = ref<Reservation|null>(null)
const handleEdit = (reservation: Reservation) => {
  selectedReservation.value = reservation
  showForm.value = true
}


</script>

<template>
  <div>
    <div class="mt-6">
      <div class="flex justify-between mb-3">
        <el-button @click="handleChangeStartDate(-1)">
          <Icon
            class="text-xl"
            name="solar:arrow-left-bold-duotone"
          />
        </el-button>
        <h1 class="text-xl font-semibold">
          Reservasi
        </h1>
        <el-button @click="handleChangeStartDate(1)">
          <Icon
            class="text-xl"
            name="solar:arrow-right-bold-duotone"
          />
        </el-button>
      </div>
      <ul class="flex gap-x-4">
        <li 
          v-for="(item) of data"
          :key="item.date.toISOString()"
          @drop="handleDrop($event, item.date)"
          @dragenter.prevent
          @dragover.prevent
          :class="[
            'rounded-lg border h-full flex-1 min-h-[320px] p-2 flex flex-col',
            dayjs(item.date).isToday() && 'bg-gray-50'
          ]"
        >
          <div class="flex justify-between">
            <p class="font-semibold">
              {{ item.date.format('dddd, D MMM YYYY') }}
            </p>
            <p
              v-if="dayjs(item.date).isToday()"
              class="rounded px-2 text-primary bg-primary-light-9"
            >
              Hari ini
            </p>
          </div>
          <ul class="flex-1 flex flex-col gap-y-2 mt-4">
            <li 
              v-for="reservation of (item.items)"
              :key="reservation._id"
              draggable="true"
              @dragstart="handleDrag($event, reservation._id)"
              class="border bg-white p-2 rounded-lg hover:bg-primary-light-9 flex"
            >
              <div class="flex-1">
                <p class="font-semibold text-xl">
                  {{ dayjs(reservation.date).format('HH:mm') }}
                </p>
                <p class="">
                  {{ reservation.patient.name }} - {{ reservation.patient.phone }}
                </p>
              </div>
              <div class="flex items-center gap-x-4">
                <el-button
                  circle
                  @click="handleEdit(reservation)"
                >
                  <Icon
                    class="2xl"
                    name="solar:pen-bold-duotone"
                  />
                </el-button>
              </div>
            </li>
          </ul>
          <el-button
            class="w-full mt-2"
            @click="handleAdd(item.date)"
          >
            + Tambah
          </el-button>
        </li>
      </ul>
    </div>
    <form-reservation 
      v-model:show="showForm"
      :selected-date="selectedDate"
      v-model:selected-reservation="selectedReservation"
      @success-update="() => refetch()"
    />
  </div>
</template>