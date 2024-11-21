import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
resolve: {
    alias: {
      '@':   path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
    proxy: {
        '/api': {
          target: 'http://localhost:5000', // Backend server URL
          changeOrigin: true,
          secure: false,
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.error('Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Proxy request made for:', req.url);
            });
        },
    
}}}
});
