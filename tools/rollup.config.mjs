import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import wasm from '@rollup/plugin-wasm';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    entryFileNames: 'bundle.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    nodeResolve({ browser: true }),
    typescript({ target: 'es2022', module: 'es2022' }),
    wasm(),
    copy({ targets: [
      { src: 'public/*', dest: 'dist' },
      { src: 'service-worker.js', dest: 'dist' }
    ] })
  ],
  watch: {
    include: 'src/**'
  }
};
