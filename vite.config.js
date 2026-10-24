import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: { format: 'iife', name: 'TahaqqaqnaApp', manualChunks: undefined, inlineDynamicImports: true }
    }
  }
})
