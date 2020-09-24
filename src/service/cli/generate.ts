import {promises as fs} from 'fs';
import {
  getRandom,
  print,
  shuffle
} from '@utils';
import {
  makeOffer,
  OfferType
} from '@entities/offer';

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

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
) => makeOffer({
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
) => Array(count).fill(null).map(() => generateOffer(types, titles, categories, sentences));

const writeFileWithMocks = async <T>(data: T[]): Promise<void> => {
  const fileName = `mocks.json`;

  try {
    await fs.writeFile(fileName, JSON.stringify(data, undefined, 2), `utf-8`);
    print.success(`Файл "${fileName}" успешно создан.`);
  } catch (error) {
    print.error(`Не удалось записать данные в файл. ${error}`);
  }
};

const readContentFile = async (filePath: string): Promise<string[]> => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.trim().split(`\n`);
  } catch (error) {
    print.error(error);
  }

  return [];
};

enum GenerateCountRestrict {
  MIN = 1,
  MAX = 1000
}

export const cliCommandGenerate = {
  name: `--generate`,
  async run(count: string): Promise<void> {
    const offerCount = Number.parseInt(count, 10) || GenerateCountRestrict.MIN;

    if (offerCount > GenerateCountRestrict.MAX) {
      print.error(`Не больше ${GenerateCountRestrict.MAX} объявлений`);
      return;
    }

    const [
      titles,
      categories,
      sentences
    ] = await Promise.all([
      readContentFile(FILE_TITLES_PATH),
      readContentFile(FILE_CATEGORIES_PATH),
      readContentFile(FILE_SENTENCES_PATH)
    ]);

    const offers = generateOffers(
        offerCount,
        Object.values(OfferType),
        titles,
        categories,
        sentences
    );

    await writeFileWithMocks(offers);
  }
};
