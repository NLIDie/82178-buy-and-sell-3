import chalk from 'chalk';

const success = (...text: unknown[]): void => {
  console.info(chalk.green(text));
};

const error = (...text: unknown[]): void => {
  console.error(chalk.red(text));
};

const info = (...text: unknown[]): void => {
  console.info(chalk.blue(text));
};

const log = (...text: unknown[]): void => {
  console.info(chalk.gray(text));
};

export const print = {
  success,
  error,
  info,
  log
};
