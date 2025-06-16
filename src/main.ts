import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Vector3,
  InstancedMesh,
} from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new Engine(canvas);
const scene = new Scene(engine);

const camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 4, 20, Vector3.Zero(), scene);
camera.attachControl(canvas, true);

new HemisphericLight('light', new Vector3(0, 1, 0), scene);

MeshBuilder.CreateGround('ground', { width: 50, height: 50 }, scene);

const houses: InstancedMesh[] = [];
const base = MeshBuilder.CreateBox('house', { size: 1 }, scene);
base.position.y = 0.5;
for (let i = 0; i < 25; i++) {
  const inst = base.createInstance('house_' + i);
  inst.position.x = (i % 5) * 2 - 4;
  inst.position.z = Math.floor(i / 5) * 2 - 4;
  houses.push(inst);
}
base.setEnabled(false);

const worker = new Worker(new URL('./sim/bridge.ts', import.meta.url), { type: 'module' });
worker.onmessage = (e) => {
  const { id, x, y } = e.data;
  if (houses[id]) {
    houses[id].position.x = x;
    houses[id].position.z = y;
  }
};

engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener('resize', () => {
  engine.resize();
});
