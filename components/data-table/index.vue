<script lang="ts" setup generic="T">
import type { TableColumnCtx } from 'element-plus'

const props = defineProps<{
  data?: T[],
  columns?: Partial<TableColumnCtx<T> & { component: unknown }>[],
  name?: string,
  meta? : {
    total?: number
  },
  deleteLabelKey?: string
  spanMethod: (data: any) => any
}>()


type Rec = Record<`column-${string}`, (props: T) => any>

interface Slot extends Rec {
  default(props: T): any
  form(props: { values: T }): any
}

defineSlots<Slot>()


const emit = defineEmits<{
  (e: 'create', data: T): Promise<void>
  (e: 'delete', data: T): Promise<void>
  (e: 'update', data: T): Promise<void>
  (e: 'search', data: string): Promise<void>
}>()


const router = useRouter()
const route = useRoute()

const currentPage = computed(() => Number(route.query.page || 1))

const search = ref('')
const showDrawer = ref(false)
const isEdit = ref(false)
const formValues = ref({} as any)

const handlePageChange = (page: number) => router.push({query: { page } })

const handleDelete = (data: T) => {

  ElMessageBox.confirm(
    `Yakin hapus data ${props.name} ${data[props.deleteLabelKey as keyof T] || ''}`,
    'Hapus Data',
    {
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
      type: 'warning',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          await emit('delete', data)
          done()
          instance.confirmButtonLoading = false
        } else {
          done()
        }
      }
    }
  ).then(() => {
    ElMessage({
      type: 'success',
      message: 'Hapus data berhasil',
    })
  })
}
const handleEdit = (data: T) => {
  showDrawer.value = true
  isEdit.value = true
  formValues.value = { ...data }
}

const handleSubmit = (data: any) => {

  if(isEdit.value){
    emit('update', data)
  } else {
    emit('create', data)
  }
  
  showDrawer.value = false
}

watch(showDrawer, (newValue) => {
  if(!newValue) {
    formValues.value = {}
    isEdit.value = false
  }
})

const handleSearch = () => {
  emit('search', search.value)
}

const ElForm = resolveComponent('el-form') as string

</script>

<template>
  <el-card 
    shadow="hover" 
    :body-style="{ padding: 0 }"
  >
    <template #header>
      <div class="flex justify-between">
        <p class="text-xl font-semibold">
          Data {{ props.name }}
        </p>
        <div class="lg:w-[320px]">
          <el-input 
            v-model="search"
            @blur="handleSearch"
            class="font-normal"
            placeholder="Cari data"
          >
            <template #suffix>
              <button>
                <Icon name="solar:minimalistic-magnifer-line-duotone" />
              </button>
            </template>  
          </el-input>
        </div>
      </div>
    </template>
    <el-table 
      class="w-full"
      size="large"
      :data="props.data"
      :span-method="spanMethod"
    >
      <el-table-column 
        v-for="column of props.columns"
        v-bind="column"
        :key="column.prop"
      >
        <template
          v-if="$slots[`column-${column.prop as string}`]"
          #default="scope"
        >
          <slot
            :name="`column-${column.prop as string}`"
            v-bind="scope.row"
          />
        </template>
      </el-table-column>
      <el-table-column
        width="160"
        fixed="right"
        align="right"
      >
        <template #header>
          <el-button
            type="primary"
            @click="showDrawer = true"
          >
            <Icon
              class="mr-2 text-lg"
              name="solar:add-square-line-duotone"
            />
            {{ props.name }}
          </el-button>
        </template>
        <template #default="scope">
          <el-popover
            placement="bottom-end"
            trigger="click"
          >
            <template #reference>
              <el-button
                circle
                style="margin-right: 16px"
              >
                <Icon
                  class="text-xl"
                  name="solar:menu-dots-bold-duotone"
                />
              </el-button>
            </template>
            <div class="flex flex-col gap-y-4">
              <el-button @click="handleEdit(scope.row)">
                <Icon
                  class="mr-2"
                  name="solar:pen-bold-duotone"
                />
                Edit
              </el-button>
              <hr>
              <el-button
                type="danger"
                @click="handleDelete(scope.row)"
              >
                <Icon
                  class="mr-2"
                  name="solar:trash-bin-trash-bold-duotone"
                />
                Hapus
              </el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <div class="p-4 flex justify-end">
      <el-pagination 
        background 
        layout="prev, pager, next" 
        :total="props.meta?.total"
        :page-count="Math.ceil(props.meta?.total as number / 10)"
        :current-page="currentPage"
        @current-change="handlePageChange"
        @next-click="() => handlePageChange(currentPage + 1)"
        @prev-click="() => handlePageChange(currentPage - 1)"
      />
    </div>
  </el-card>
  <el-drawer 
    v-model="showDrawer"
    direction="rtl"
    class="min-w-[80%] lg:min-w-[640px]"
    :close-on-click-modal="false"
  >
    <template #header>
      <h3
        v-if="isEdit"
        class="text-lg font-semibold"
      >
        Update data {{ props.name }}
      </h3>
      <h3
        v-else
        class="text-lg font-semibold"
      >
        Tambah {{ props.name }} Baru
      </h3>
    </template>
    <el-scrollbar>
      <vee-form
        v-if="showDrawer"
        v-slot="{ values }"
        label-position="top"
        status-icon
        :as="ElForm"
        :initial-values="(formValues as object)"
        @submit="handleSubmit"
      >
        <slot
          name="form"
          :values="(values as T)"
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
          <el-button @click="showDrawer = false">
            Batal
          </el-button>
        </el-form-item>
      </vee-form>
    </el-scrollbar>
  </el-drawer>
</template>