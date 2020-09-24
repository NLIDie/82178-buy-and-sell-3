import {cliCommandGenerate} from './generate';
import {cliCommandVersion} from './version';
import {cliCommandHelp} from './help';
import {cliCommandServer} from './server';

export const processCLICommands = async (userArgs: string[]): Promise<void> => {
  const [commandName, commandValue] = userArgs;

  switch (commandName) {
    case cliCommandVersion.name: {
      cliCommandVersion.run();
      break;
    }

    case cliCommandGenerate.name: {
      cliCommandGenerate.run(commandValue);
      break;
    }

    case cliCommandServer.name: {
      cliCommandServer.run(commandValue);
      break;
    }

    default: {
      cliCommandHelp.run();
    }
  }
};

