import chalk from 'chalk';

const success = (...text: string[]): void => {
  console.info(chalk.green(text));
};

const error = (...text: string[]): void => {
  console.error(chalk.red(text));
};

const info = (...text: string[]): void => {
  console.info(chalk.blue(text));
};

const log = (...text: string[]): void => {
  console.info(chalk.gray(text));
};

export const print = {
  success,
  error,
  info,
  log
};
