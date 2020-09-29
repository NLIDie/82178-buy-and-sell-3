import {offerGenerator, offerMock} from '@entities/offer';
import {print} from '@utils';

enum GenerateCountRestrict {
  MIN = 1,
  MAX = 1000
}

export const cliCommandGenerate = {
  name: `--generate`,
  async run(count: string): Promise<void> {
    const offerCount = Number.parseInt(count, 10)
      ? Number.parseInt(count, 10)
      : GenerateCountRestrict.MIN;

    if (offerCount > GenerateCountRestrict.MAX) {
      print.error(`Не больше ${GenerateCountRestrict.MAX} объявлений`);
      return;
    }

    const offers = await offerGenerator.make(offerCount);

    await offerMock.write(offers);
  }
};
