export const probability = (num: number) => {
  return !!num && Math.random() <= num;
}