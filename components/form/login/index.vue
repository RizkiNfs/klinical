<script lang="ts" setup generic="T">
import type { SubmissionHandler } from 'vee-validate'
const { mutateAsync: login } = useLogin()

const schema = {
  username: (value: string) => value ? true : 'Username harus diisi',
  password: (value: string) => value ? true : 'Password harus diisi',
}


const handleSubmit: SubmissionHandler = async (values, field) => {

  try {
    await login({
      password: values.password,
      username: values.username
    })

    await navigateTo('/app') 
  } catch(e) {
    field.setErrors({
      password: 'password atau username salah'
    })
  }

}

const form = resolveComponent('el-form') as string

</script>

<template>
  <vee-form 
    label-position="top"
    :as="form" 
    :validation-schema="schema"
    @submit="handleSubmit"
  >
    <field-input
      name="username"
      label="Username"
    />
    <field-input
      name="password"
      label="Password"
      type="password"
    />
    <el-button
      class="w-full mt-4"
      type="primary"
      native-type="submit"
    >
      Masuk
    </el-button>
  </vee-form>
</template>