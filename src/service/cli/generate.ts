import {promises as fs} from 'fs';
import {
  v1 as uuidv1,
  v5 as uuidv5
} from 'uuid';
import {getRandomInteger} from '../utils/getRandomInteger';
import {shuffle} from '../utils/shuffle';

enum OfferCategory {
  BOOKS = `Книги`,
  GAMES = `Игры`,
  ANIMALS = `Животные`,
  OTHER = `Разное`,
  CROCKERY = `Посуда`,
  MAGAZINES = `Журналы`
}

enum OfferType {
  OFFER = `offer`,
  SALE = `sale`
}

enum SumRestrict {
  MIN = 1000,
  MAX = 100000
}

enum PictureRestrict {
  MIN = 1,
  MAX = 16
}

const OFFER_TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
  `Продам коллекцию журналов «Огонёк»`,
  `Отдам в хорошие руки подшивку «Мурзилка»`,
  `Продам советскую посуду. Почти не разбита`,
  `Куплю детские санки.`
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const OFFER_CATEGORIES = Object.values(OfferCategory);
const OFFER_TYPES = Object.values(OfferType);

type Offer = {
  id: string;
  type: OfferType;
  title: string;
  picture: string;
  description: string;
  sum: number;
  category: OfferCategory[];
}

const getPictureFileName = (number: number): string => `item${number}.jpg`;

const makeOffer = (offerData: Omit<Offer, 'id'>): Offer => ({
  id: uuidv5(`Offer`, uuidv1()),
  ...offerData
});

const generateOffer = (): Offer => makeOffer({
  type: shuffle(OFFER_TYPES)[getRandomInteger(0, OFFER_TYPES.length - 1)],
  title: shuffle(OFFER_TITLES)[getRandomInteger(0, OFFER_TITLES.length - 1)],
  picture: getPictureFileName(getRandomInteger(PictureRestrict.MIN, PictureRestrict.MAX)),
  description: shuffle(SENTENCES).slice(0, getRandomInteger(1, SENTENCES.length - 1)).join(` `),
  category: shuffle(OFFER_CATEGORIES).slice(0, getRandomInteger(1, OFFER_CATEGORIES.length - 1)),
  sum: getRandomInteger(SumRestrict.MIN, SumRestrict.MAX)
});

const generateOffers = (count: number): Offer[] => (
  Array(count)
    .fill(null)
    .map<Offer>(generateOffer)
);

const writeFileWithMocks = async <T>(data: T[]): Promise<void> => {
  const fileName = `mocks.json`;

  await fs.writeFile(fileName, JSON.stringify(data), `utf-8`);

  console.info(`Файл ${fileName} успешно создан.`);
};

enum GenerateCountRestrict {
  MIN = 1,
  MAX = 1000
}

export const cliCommandGenerate = {
  name: `--generate`,
  async run(count: number): Promise<void> {
    const offerCount = Number.isInteger(count) ? count : GenerateCountRestrict.MIN;

    if (offerCount > GenerateCountRestrict.MAX) {
      console.info(`Не больше ${GenerateCountRestrict.MAX} объявлений`);
      return;
    }

    const offers = generateOffers(offerCount);

    await writeFileWithMocks(offers);
  }
};
