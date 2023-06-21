// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    JWT_SECRET: '',
    MONGO_URL: '',
    DB_NAME: '',
    JWT_KEY: '',
  },
  build: {
    transpile: ['trpc-nuxt']
  },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@vueuse/nuxt',
    [
      '@vee-validate/nuxt',
      {
        autoImports: true,
        componentNames: {
          Form: 'VeeForm',
          Field: 'VeeField',
          FieldArray: 'VeeFieldArray',
          ErrorMessage: 'VeeErrorMessage',
        },
      },
    ],
  ],
  imports: {
    dirs: ['composables/**']
  },
  routeRules: {
    '/app/**': {
      ssr: false
    }
  },
  css: [
    '@/assets/css/main.css',
  ],
  googleFonts: {
    families: {
      'Figtree': [400,600,700],
    }
  },
  experimental: {
    
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/element/index.scss" as *;',
        },
      },
    },
  },
  elementPlus: {
    importStyle: 'scss',
  },
})
