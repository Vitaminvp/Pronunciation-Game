export const isZeroLength = str => str.length === 0;

export const isDefined = value => value != null;

export const isDark = (colorName, words) => {
  const hex = words[colorName].substring(1, 7);
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 < 120;
};

export const randomColor = () =>
  `#${Math.random()
    .toString(16)
    .substr(-6)}`.toUpperCase();
