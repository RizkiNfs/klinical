<script lang="ts" setup>

const rules = {
  required: (value: unknown) => value ? true : 'Harus diisi'
}

</script>

<template>
  <field-input
    label="Name"
    name="name"
    :rules="rules.required"
  />

  <field-input
    label="Kontak"
    name="phone"
    :rules="rules.required"
  />

  <field-input
    label="Alamat"
    name="address"
  />

  <field-radio-group
    label="Jenis Kelamin"
    name="gender"
  > 
    <el-radio label="Laki-laki" />
    <el-radio label="Perempuan" />
  </field-radio-group>

  <field-date-picker
    label="Tanggal lahir"
    name="dateOfBirth"
  />
</template>