<script lang="ts" setup>
import type { Account } from '~/types/model/account'
import { accountType } from '~/types/model/account'

const rules = {
  required: (value: unknown) => value ? true : 'Harus diisi'
}

const route = useRoute()
const search = ref('')

const { data: patient, refetch } = useAccounts({
  page: computed(() => Number(route.query.page)),
  searchKey: computed(() => search.value),
})
const { mutateAsync: createAccount } = useCreateAccount()
const { mutateAsync: deleteAccount } = useDeleteAccount()
const { mutateAsync: updateAccount } = useUpdateAccount()

const handleDelete = async (values: Account) => {
  await deleteAccount({_id: values._id})
  refetch()
}

const handleCreate = async (values: Account) => {

  await createAccount({
    name: values.name,
    code: values.code,
    type: values.type
  })
  refetch()

}

const handleUpdate = async (values: Account) => {

  await updateAccount({ 
    _id: values._id,
    name: values.name,
    code: values.code,
    type: values.type
  })
  refetch()

}

</script>

<template>
  <div>
    <data-table
      name="Akun"
      @create="handleCreate"
      @update="handleUpdate"
      @delete="handleDelete"
      @search="search = $event"
      :data="patient?.data"
      :meta="{ total: patient?.meta?.total as number }"
      :columns="[
        { prop: 'name', label: 'Nama' },
        { prop: 'code', label: 'Kode' },
        { prop: 'type.label', label: 'Tipe' },
      ]"
    >
      <template #column-code="item">
        {{ item.type.code }} - {{ item.code }}
      </template>
      <template #form="{values}">
        <field-select 
          class="w-full"
          name="type"
          label="Jenis"
          placeholder="Pilih"
          value-key="code"
          :rules="rules.required"
        >
          <el-option
            v-for="i in accountType"
            :key="i.code"
            :label="`${i.code} - ${i.label}`"
            :value="i"
          />
        </field-select>
      
        <field-input
          label="Kode"
          name="code"
          type="number"
          maxlength="4"
          :rules="rules.required"
        >
          <template #prefix>
            <span>{{ values?.type?.code }} - </span>
          </template>
        </field-input>
      
        <field-input
          label="Nama"
          name="name"
          :rules="rules.required"
        />
      </template>
    </data-table>
  </div>
</template>