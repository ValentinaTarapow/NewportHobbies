import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// GitHub Pages del repositorio: https://valentintarapow.github.io/NewportHobbies/
// Con un dominio propio en la raíz, publicar con base "/".
export default defineConfig({
  base: process.env.GITHUB_PAGES ? "/NewportHobbies/" : "/",
  plugins: [react(), tailwindcss()],
})
