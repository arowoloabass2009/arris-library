import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // import.meta.dirname is supported in Vite 5+ / Node 20+
      '@': new URL('./src', import.meta.url).pathname,
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Function form — required by Rollup v4 / Vite 5+
        manualChunks(id: string) {
          if (id.includes('node_modules/@supabase')) return 'supabase';
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'react-vendor';
        },
      },
    },
  },

  // Expose VITE_* env vars to the client bundle
  envPrefix: 'VITE_',
})
