// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000, // vous pouvez spécifier un port différent si nécessaire
    proxy:{
      '/api':{
        target : 'http://10.25.29.16:1011',
        changeOrigin : true,
      }
    }
  }
  
});


