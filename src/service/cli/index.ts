import {cliCommandGenerate} from './generate';
import {cliCommandVersion} from './version';
import {cliCommandHelp} from './help';

export const processCLICommands = async (userArgs: string[]): Promise<void> => {
  const [commandName, commandValue] = userArgs;

  switch (commandName) {
    case cliCommandVersion.name: {
      cliCommandVersion.run();
      break;
    }

    case cliCommandGenerate.name: {
      await cliCommandGenerate.run(parseInt(commandValue, 10));

      break;
    }

    default: {
      cliCommandHelp.run();
    }
  }
};

