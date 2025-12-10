import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 注意：如果您部署到 https://<USERNAME>.github.io/<REPO>/
  // 请将下面的 base 修改为 '/<REPO>/' (例如 '/my-portfolio/')
  // 如果是部署到 https://<USERNAME>.github.io/ (个人主页仓库)，则保持 '/'
  base: './', 
})