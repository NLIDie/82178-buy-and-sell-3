import packageJSON from '../../../package.json';

export const cliCommandVersion = {
  name: `--version`,
  shortName: `-v`,
  description: `Выводит номер версии`,
  run(): void {
    console.info(`v${packageJSON.version}`);
  }
};
