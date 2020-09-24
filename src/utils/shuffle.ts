import _shuffle from 'lodash/shuffle';

export const shuffle = <T>(arr: T[]): T[] => {
  return _shuffle(arr);
};
