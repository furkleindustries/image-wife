export const getRandomIndex = <T extends any>(arr: T[]): T => (
  arr[Math.floor(Math.random() * arr.length)]
);
