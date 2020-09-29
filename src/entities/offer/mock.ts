import path from 'path';
import {promises as fs} from 'fs';
import {Offer} from './offer';
import {print} from '@utils';

const FILE_MOCK_PATH = path.join(__dirname, `../../../mocks.json`);

const writeMockFile = async (offers: Offer[]): Promise<void> => {
  const content = JSON.stringify(offers, undefined, 2);

  try {
    await fs.writeFile(FILE_MOCK_PATH, content, `utf-8`);
    print.success(`Файл "${FILE_MOCK_PATH}" с offers успешно создан.`);
  } catch (err) {
    print.error(`Не удалось создать файл "${FILE_MOCK_PATH}" с offers. Error: ${err}`);
  }
};

const readMockFile = async (): Promise<string> => {
  let content = `[]`;

  try {
    content = await fs.readFile(FILE_MOCK_PATH, `utf-8`);
  } catch (err) {
    print.error(`Не удалось прочитать файл "${FILE_MOCK_PATH}" c offers. Error: ${err}`);
  }

  return content;
};

const parseContent = (content: string): Offer[] => {
  let offers: Offer[] = [];

  try {
    offers = JSON.parse(content);
  } catch (err) {
    print.error(`Не удалось преобразовать данные из mock файла в массив offers. Error: ${err}`);
  }

  return offers;
};

const getMockOffers = async (): Promise<Offer[]> => {
  const content = await readMockFile();
  const offers = parseContent(content);

  return offers;
};


export const offerMock = {
  write: writeMockFile,
  read: getMockOffers
};
