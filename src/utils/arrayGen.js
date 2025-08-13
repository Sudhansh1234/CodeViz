export function generateArray(n = 30, max = 100) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * max) + 1);
}
