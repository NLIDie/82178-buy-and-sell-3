import path from 'path';
import {
  shuffle,
  getRandom,
  readFileWithContent
} from '@utils';
import {
  Offer,
  offer,
  OfferType
} from './offer';

const FILE_SENTENCES_PATH = path.join(__dirname, `../../../data/sentences.txt`);
const FILE_TITLES_PATH = path.join(__dirname, `../../../data/titles.txt`);
const FILE_CATEGORIES_PATH = path.join(__dirname, `../../../data/categories.txt`);

enum SumRestrict {
  MIN = 1000,
  MAX = 100000
}

enum PictureRestrict {
  MIN = 1,
  MAX = 16
}

const getPictureFileName = (number: number): string => `item${number}.jpg`;

const generateOffer = (
    types: OfferType[],
    titles: string[],
    categories: string[],
    sentences: string[]
) => offer.make({
  type: shuffle(types)[getRandom(0, types.length - 1)],
  title: shuffle(titles)[getRandom(0, titles.length - 1)],
  picture: getPictureFileName(getRandom(PictureRestrict.MIN, PictureRestrict.MAX)),
  description: shuffle(sentences).slice(0, getRandom(1, sentences.length - 1)).join(` `),
  category: shuffle(categories).slice(0, getRandom(1, categories.length - 1)),
  sum: getRandom(SumRestrict.MIN, SumRestrict.MAX)
});

const generateOffers = (
    count: number,
    types: OfferType[],
    titles: string[],
    categories: string[],
    sentences: string[]
): Offer[] => (
  Array(count)
    .fill(null)
    .map(() => generateOffer(types, titles, categories, sentences))
);

const makeOffers = async (count = 1): Promise<Offer[]> => {
  const [
    titles,
    categories,
    sentences
  ] = await Promise.all([
    readFileWithContent(FILE_TITLES_PATH),
    readFileWithContent(FILE_CATEGORIES_PATH),
    readFileWithContent(FILE_SENTENCES_PATH)
  ]);

  const offers = generateOffers(
      count,
      Object.values(OfferType),
      titles,
      categories,
      sentences
  );

  return offers;
};

export const offerGenerator = {
  make: makeOffers
};
