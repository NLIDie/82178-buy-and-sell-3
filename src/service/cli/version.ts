import {print} from '@utils';
import packageJSON from '../../../package.json';

export const cliCommandVersion = {
  name: `--version`,
  shortName: `-v`,
  description: `Выводит номер версии`,
  run(): void {
    print.info(`v${packageJSON.version}`);
  }
};
