import init, { tick } from './pkg';

init().then(() => {
  setInterval(() => {
    tick();
  }, 1000);
});
