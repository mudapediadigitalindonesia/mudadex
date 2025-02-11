import _ from 'lodash';

const subscriptMap: any = {
  0: '₀',
  1: '₁',
  2: '₂',
  3: '₃',
  4: '₄',
  5: '₅',
  6: '₆',
  7: '₇',
  8: '₈',
  9: '₉',
};

const formatWithSubscript = (value: string) => {
  // Konversi nilai ke string dan ganti digit menjadi subscript
  return _.replace(value, /[0-9]/g, (digit) => subscriptMap[digit]);
}

export default formatWithSubscript