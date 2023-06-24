<script lang="ts" setup>

const rules = {
  required: (value: unknown) => value ? true : 'Harus diisi'
}

</script>

<template>
  <field-input
    label="Nama Barang"
    name="name"
    :rules="rules.required"
  />

  <field-input
    label="Harga"
    name="price"
    type="number"
    :rules="rules.required"
  />

  <field-input
    label="Stok"
    name="stock"
    type="number"
    :rules="rules.required"
  />

  <field-input
    label="Deskripsi"
    name="description"
    type="textarea"
  />
</template>