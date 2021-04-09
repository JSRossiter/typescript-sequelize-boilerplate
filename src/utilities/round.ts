export const round = (num: number, dec: number): number =>
  Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);

export const roundDown = (num: number, dec: number): number =>
  Math.floor(num * Math.pow(10, dec)) / Math.pow(10, dec);
