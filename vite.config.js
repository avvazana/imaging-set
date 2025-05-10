import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const basePath = '/imaging-set/'

export default defineConfig({
  plugins: [react()],
  base: basePath,
})
