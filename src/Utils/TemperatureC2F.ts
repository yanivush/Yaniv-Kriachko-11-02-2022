export const convertToF = (temp: number) => (+temp * (9 / 5) + 32).toFixed(0);
export const convertToC = (temp: number) => ((+temp - 32) * (5 / 9)).toFixed(0);