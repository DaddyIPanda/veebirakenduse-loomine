// Configures Vite to compile Vue single-file components.
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/veebirakenduse-loomine/',
  plugins: [vue()],
})
