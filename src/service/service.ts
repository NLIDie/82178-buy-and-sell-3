import {processCLICommands} from './cli';
import {ExitCode} from './constants';

const main = async (argv: string[]) => {
  const userArgs = argv.slice(2);

  await processCLICommands(userArgs);

  process.exit(ExitCode.SUCCESS);
};

main(process.argv);
