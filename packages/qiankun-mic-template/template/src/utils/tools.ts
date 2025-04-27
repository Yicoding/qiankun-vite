/**
 * 获取随机数，min <= x < max
 * @param {number} min
 * @param {number} max
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}
