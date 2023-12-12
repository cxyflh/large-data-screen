import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入resolve
import { resolve } from 'path'
 
// 文档: https://vitejs.dev/config/ 
export default defineConfig({
  plugins: [vue()],
  server: {
    // port: '5173',
    proxy: {
      '/state-assets-monitor': {
        target: 'http://192.168.4.224:10088',
        changeOrigin: true,
        pathRewrite: {
          "^/state-assets-monitor": "/"
        }
      }
    },
  },
  resolve: {
    // 设置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
      '*': resolve('')
    },
  }
})