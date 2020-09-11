// @ts-check

'use strict';

/**
 * Перетасовывает массив.
 * @param {any[]} arr
 * @return {any[]}
 */
const shuffle = (arr) => {
  const shuffledArray = arr.reduceRight(
      (acc, _, index) => {
        const randomPosition = Math.floor(Math.random() * index);

        acc[index] = acc[randomPosition];
        acc[randomPosition] = acc[index];
      },
      [...arr]
  );

  return shuffledArray;
};

module.exports = {
  shuffle
};
