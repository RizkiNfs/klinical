<script lang="ts" setup>
import type { Journal } from '~/types/model/journal'

const rules = {
  required: (value: unknown) => value ? true : 'Harus diisi'
}

const route = useRoute()
const search = ref('')

const { data: patient, refetch } = useJournals({
  page: computed(() => Number(route.query.page)),
  searchKey: computed(() => search.value),
})
const { mutateAsync: createJournal } = useCreateJournal()
const { mutateAsync: deleteJournal } = useDeleteJournal()
const { mutateAsync: updateJournal } = useUpdateJournal()

const searchAccountKey = ref('')
const { data: accounts, isLoading: isLoadingAccounts } = useAccounts({ searchKey: searchAccountKey })


const handleDelete = async (values: Journal) => {
  await deleteJournal({_id: values._id})
  refetch()
}

const handleCreate = async (values: Journal) => {

  await createJournal({
    date: new Date(values.date || new Date()),
    debit: values.debit,
    credit: values.credit
  })
  refetch()

}

const handleUpdate = async (values: Journal) => {

  await updateJournal({ 
    _id: values._id,
    date: new Date(values.date || new Date()),
    debit: values.debit,
    credit: values.credit
  })
  refetch()

}

const arraySpanMethod = ({columnIndex}: any) => {
  if (columnIndex  === 1) {
    return {
      rowspan: 1,
      colspan: 3
    }
  } 

  if(columnIndex ===  2 || columnIndex ===  3){
    return {
      rowspan: 0,
      colspan: 0,
    }
  }

}

</script>

<template>
  <div>
    <data-table
      name="Jurnal"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      @search="search = $event"
      :span-method="arraySpanMethod"
      :data="patient?.data"
      :meta="{ total: patient?.meta?.total as number }"
      :columns="[
        { prop: 'createdAt', label: 'Tanggal', width: 120, },
        { prop: 'account', label: 'Akun', },
        { prop: '', label: 'Kredit', width: 120, align: 'right' },
        { prop: '', label: 'Debit', width: 120, align: 'right' },
      ]"
    >
      <template #column-createdAt="item">
        {{ dayjs(item.createdAt).format('DD-MM-YYYY') }}
      </template>
      <template #column-account="item">
        <ul class="w-full">
          <li 
            v-for="(debit, index) of item.debit" 
            :key="index"
            class="flex w-full"
          >
            <p class="flex-1">
              {{ debit.name }}
            </p>
            <p class="w-[110px] text-right">
              {{ decimalSeparator(debit.value) }}
            </p>
            <p class="w-[110px] text-right" />
          </li>
          <li 
            v-for="(credit, index) of item.credit" 
            :key="index"
            class="flex w-full"
          >
            <p class="flex-1 pl-6">
              {{ credit.name }}
            </p>
            <p class="w-[110px] text-right" />
            <p class="w-[110px] text-right">
              {{ decimalSeparator(credit.value) }}
            </p>
          </li>
        </ul>
      </template>

      <template #form>
        <field-date-picker 
          name="date" 
          label="Tanggal"
          format="DD-MM-YYYY"
          :placeholder="dayjs().format('DD-MM-YYYY')"
        />

        <field-array
          name="debit"
          label="Debit"
          title="Debit"
          :initial-value="{}"
        >
          <template #default="{index}">
            <div class="flex gap-x-2 flex-1">
              <field-select 
                class="w-full"
                :name="`debit[${index}]`"
                label=""
                placeholder="Pilih Akun"
                value-key="_id"
                filterable
                remote
                :remote-method="($event: string) => searchAccountKey = $event"
                :loading="isLoadingAccounts"
              >
                <el-option
                  v-for="i in accounts?.data"
                  :key="i._id"
                  :label="`${i.type.code}-${i.code} - ${i.name}`"
                  :value="i"
                />
              </field-select>

              <field-input-number
                :rules="rules.required"
                :name="`debit[${index}].value`"
                label=""
                placeholder="Jumlah"
                type="number"
                min="1"
              />
            </div>
          </template>
        </field-array>

        <field-array
          name="credit"
          label="Kredit"
          title="Kredit"
          :initial-value="{}"
        >
          <template #default="{index}">
            <div class="flex gap-x-2 flex-1">
              <field-select 
                class="w-full"
                :name="`credit[${index}]`"
                label=""
                placeholder="Pilih Akun"
                value-key="_id"
                filterable
                remote
                :remote-method="($event: string) => searchAccountKey = $event"
                :loading="isLoadingAccounts"
              >
                <el-option
                  v-for="i in accounts?.data"
                  :key="i._id"
                  :label="`${i.type.code}-${i.code} - ${i.name}`"
                  :value="i"
                />
              </field-select>

              <field-input-number
                :rules="rules.required"
                :name="`credit[${index}].value`"
                label=""
                placeholder="Jumlah"
                type="number"
                min="1"
              />
            </div>
          </template>
        </field-array>
      </template>
    </data-table>
  </div>
</template>