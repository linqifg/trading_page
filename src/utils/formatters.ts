import { NumberFormatter } from './types';

export const formatReturn: NumberFormatter = (value) => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '0.00%';
  }
  const numValue = Number(value);
  return `${numValue >= 0 ? '+' : ''}${numValue.toFixed(2)}%`;
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('zh-CN').format(value);
};

export const getReturnColor = (value: number | null | undefined): string => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '#888888';
  }
  const numValue = Number(value);
  return numValue >= 0 ? '#f08300' : '#f6465d';
};

export const formatUniqueName = (name: string): string => {
  if (/^\d+$/.test(name) && name.length > 6) {
    return `${name.slice(-6)}`;
  }
  return name;
};