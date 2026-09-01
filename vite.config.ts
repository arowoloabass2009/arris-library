import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Generate source maps for production debugging (optional — remove if you prefer)
    sourcemap: false,
    rollupOptions: {
      output: {
        // Chunk vendor libs separately for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'supabase':     ['@supabase/supabase-js'],
        },
      },
    },
  },

  // Ensure env vars are available to the client bundle
  envPrefix: 'VITE_',
})
