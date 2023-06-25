/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    indent: [2, 2, { 'SwitchCase': 1 }],
    'vue/multi-word-component-names': 0,
    'vue/no-setup-props-destructure': 0,
  }
}
