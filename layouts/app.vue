<script lang="ts" setup>
const menus = [
  { title: 'Dashboard', to: '/app', icon: 'solar:graph-new-up-bold-duotone' },
  { title: 'Transaksi', to: '/app/transaction', icon: 'solar:hand-money-bold-duotone' },
  { title: 'Layanan', to: '/app/service', icon: 'solar:clipboard-heart-bold-duotone' },
  { title: 'Inventori', to: '/app/inventory', icon: 'solar:box-bold-duotone' },
  { title: 'Keuangan', to: '/app/finance', icon: 'solar:wallet-money-bold-duotone' },
  { 
    title: 'Pasien', 
    icon: 'solar:user-id-bold-duotone',
    submenu: [
      { title: 'Daftar Pasien', to: '/app/patient/list'},
      { title: 'Rekam Medis'},
    ]
  },
  { title: 'Reservasi', to: '/app/reservation', icon: 'solar:three-squares-bold-duotone' },
]

const route = useRoute()

const token = useCookie('token')

const handleLogout = async () => {
  token.value = null
  return await navigateTo('/')
}

</script>

<template>
  <el-container class="h-screen">
    <el-aside
      width="270px"
      class="min-h-screen border-r border-gray-200"
    >
      <el-scrollbar class="px-4">
        <div class="flex gap-x-2 p-4">
          <Icon
            class="text-primary text-3xl"
            name="solar:hand-heart-linear"
          />
          <h2 class="font-bold text-2xl">
            Klinks
          </h2>
        </div>
        <el-menu
          class="!border-none mt-4"
          router
          :default-active="route.fullPath"
        >
          <template v-for="(menu, index) in menus">
            <el-sub-menu
              v-if="menu.submenu"
              :key="`${index}`"
              :index="`${index}`"
            >
              <template #title>
                <Icon
                  class="text-xl mr-4"
                  :name="menu.icon"
                />
                {{ menu.title }}
              </template>
              <el-menu-item-group>
                <el-menu-item 
                  v-for="(submenu, submenuIndex) in menu.submenu"
                  :route="{path: submenu?.to || '#'}"
                  :key="`${index}-${submenuIndex}`"
                  :index="submenu?.to || `${index}-${submenuIndex}`"
                >
                  {{ submenu.title }}
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-menu-item
              v-else
              :route="{path: menu?.to || '#'}"
              :key="`${index}-2`"
              :index="menu?.to || `${index}`"
            >
              <Icon
                class="text-xl mr-4"
                :name="menu.icon"
              />
              {{ menu.title }}
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>
        <div class="h-full flex justify-between items-center">
          <button>
            <Icon
              class="text-2xl"
              name="solar:hamburger-menu-line-duotone"
            />
          </button>
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
                  class="text-[38px]"
                  name="solar:user-circle-bold-duotone"
                />
              </el-button>
            </template>
            <div class="flex flex-col gap-y-4">
              <el-button @click="handleLogout">
                <Icon
                  class="mr-2"
                  name="solar:exit-bold-duotone"
                />
                Keluar
              </el-button>
              <hr>
            </div>
          </el-popover>
        </div>
      </el-header>
      <el-scrollbar>
        <el-main>
          <slot />
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>