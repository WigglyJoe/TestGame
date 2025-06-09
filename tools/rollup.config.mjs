import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    nodeResolve({ browser: true }),
    typescript({ target: 'es2022', module: 'es2022' }),
    copy({ targets: [{ src: 'public/*', dest: 'dist' }] })
  ],
  watch: {
    include: 'src/**'
  }
};
