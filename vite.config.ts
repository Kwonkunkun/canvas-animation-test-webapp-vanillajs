import { resolve } from 'path';
import { defineConfig } from 'vite';

const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, '.') }],
  },
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  // plugins: [
  //   {
  //     /**
  //      * @description dev server 에서의 올바른 라우트를 위한 미들웨어
  //      * @See https://github.com/vitejs/vite/issues/2958#issuecomment-1065810046
  //      */
  //     name: 'rewrite-middleware',
  //     configureServer(serve) {
  //       serve.middlewares.use((req, _res, next) => {
  //         if (req.url?.startsWith('/intro')) {
  //           req.url = '/intro/';
  //         }
  //         next();
  //       });
  //     },
  //   },
  // ],
});
