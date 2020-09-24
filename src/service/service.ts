import {print} from '@utils';
import {processCLICommands} from './cli';
import {ExitCode} from './constants';

const main = async (argv: string[]) => {
  const userArgs = argv.slice(2);

  try {
    processCLICommands(userArgs);
  } catch (error) {
    print.error(error);
    process.exit(ExitCode.ERROR);
  }
};

main(process.argv);
