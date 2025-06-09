# TestGame Walking Skeleton

This project is a minimal city-builder prototype using Babylon.js and Rust-generated WebAssembly.

## Build WASM
```
cd sim
wasm-pack build --target web --out-dir ../src/sim/pkg
```

## Development
```
npm install
npm run dev
```
This starts Rollup in watch mode. Serve the `dist` folder with any static server.

## Production Build
```
npm run build
```

A service worker caches assets for offline use.
