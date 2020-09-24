import _random from 'lodash/random';

export const getRandom = (
    min: number,
    max: number,
    floating?: boolean
): number => {
  return _random(min, max, floating);
};
