import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 使用相对路径 './' 确保资源在 GitHub Pages 的任何子路径下都能正确加载
  base: './', 
})
