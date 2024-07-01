import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
            },
        },
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: resolve(__dirname, 'src/assets/icons'),
                    dest: resolve(__dirname, 'dist/assets')
                }
            ]
        })
    ]
});
