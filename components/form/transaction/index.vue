<script lang="ts" setup>

const rules = {
  required: (value: unknown) => value ? true : 'Harus diisi'
}


const searchPatientKey = ref('')
const searchServiceKey = ref('')
const searchInventoryKey = ref('')
const { data: patients, isLoading: isLoadingPatient } = usePatients({ searchKey: searchPatientKey })
const { data: services, isLoading: isLoadingService } = useServices({ searchKey: searchServiceKey })
const { data: inventories, isLoading: isLoadingInventory } = useInventories({ searchKey: searchInventoryKey })

</script>

<template>
  <field-select 
    class="w-full"
    name="patient"
    label="Pasien"
    placeholder="Masukan nama atau kontak"
    value-key="_id"
    filterable
    remote
    :remote-method="searchPatientKey = ($event as string)"
    :loading="isLoadingPatient"
  >
    <el-option
      v-for="i in patients?.data"
      :key="i._id"
      :label="`${i.name} - ${i.phone}`"
      :value="i"
    />
  </field-select>

  
  <field-array 
    name="services"
    label="Layanan"
    title="Daftar Layanan"
    :initial-value="{}"
  >
    <template #default="{index}">
      <field-select 
        class="flex-1"
        :name="`services[${index}]`"
        label=""
        :remote-method="searchServiceKey = ($event as string)"
        :loading="isLoadingService"
        placeholder="Masukan nama layanan"
        value-key="_id"
        filterable
        remote
      >
        <el-option
          v-for="i in services?.data"
          :key="i._id"
          :label="`${i.name} - ${decimalSeparator(i.price)}`"
          :value="i"
        />
      </field-select>
    </template>
  </field-array>

  
  <field-array
    name="inventories"
    label="Barang"
    title="Daftar Barang"
    :initial-value="{}"
  >
    <template #default="{index}">
      <div class="flex gap-x-2 flex-1">
        <field-select 
          class="w-full"
          :name="`inventories[${index}]`"
          label=""
          placeholder="Masukan nama barang"
          value-key="_id"
          filterable
          remote
          :remote-method="searchInventoryKey = ($event as string)"
          :loading="isLoadingInventory"
        >
          <el-option
            v-for="i in inventories?.data"
            :key="i._id"
            :label="`${i.name} - ${decimalSeparator(i.price)}`"
            :value="i"
          />
        </field-select>
        <field-input 
          :rules="rules.required"
          :name="`inventories[${index}].count`"
          label=""
          placeholder="Jumlah"
          type="number"
          min="1"
        />
      </div>
    </template>
  </field-array>

  <field-input
    label="Deskripsi"
    name="description"
    type="textarea"
  />
</template>