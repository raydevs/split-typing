import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Cambia esto
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import svgr from 'vite-plugin-svgr'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [
    react(), // Usa el nuevo plugin react
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        icon: true,
      },
    }),
  ],
})