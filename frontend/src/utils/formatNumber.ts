// src/utils/formatNumber.ts
const formatNumber = (num: number = 0): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  }

  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K+`;
  }

  return num.toString();
};

export default formatNumber;