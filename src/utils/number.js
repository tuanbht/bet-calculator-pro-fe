import isNumber from 'lodash/isNumber';

export const getNumberForDisplaying = (value) => (parseInt(value) === 0 ? '' : value);

export const displayPrice = (value) =>
  isNumber(value) ? (value >= 0 ? `$ ${Number(value).toFixed(2)}` : `($ ${Number(-value).toFixed(2)})`) : '-';

export const displayPercentage = (value) => (value ? `${(value * 100).toFixed(2)}%` : '-');
