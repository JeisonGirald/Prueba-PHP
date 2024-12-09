import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/index.jsx'],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '127.0.0.1', // Usa IPv4 explícitamente
        port: 5173,        // Puerto predeterminado de Vite
        strictPort: true,  // No cambia de puerto automáticamente si está ocupado
    },
});
