export const tickUpdate = (
  tick: number,
  setTick: (tick: number) => void,
  realDelayTime: number,
) => {
  const update = () => setTimeout(() => setTick(tick + 1), realDelayTime);
  requestAnimationFrame(update);
};
