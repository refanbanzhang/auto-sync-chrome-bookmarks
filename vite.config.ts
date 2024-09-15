import { defineConfig, WatchOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './src/manifest.json'

export default defineConfig({
  plugins: [vue(), crx({ manifest })],
  server: {
    watch: {
      include: ['src/**']
    } as WatchOptions & { include?: string[] }
  }
})