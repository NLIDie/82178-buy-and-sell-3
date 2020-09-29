import http from 'http';
import {print} from '@utils';
import {offerMock} from '@entities/offer';

const DEFAULT_PORT = 3000;
const DEFAULT_HOST = `localhost`;

enum HttpCode {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
}

const sendResponse = (
    response: http.ServerResponse,
    statusCode: HttpCode,
    message: string
) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>
  `.trim();

  response.statusCode = statusCode;
  response.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  response.end(template);
};

const onClientConnect: http.RequestListener = async (
    request: http.IncomingMessage,
    response: http.ServerResponse
): Promise<void> => {
  const notFoundMessageText = `Not found`;

  switch (request.url) {
    case `/`: {
      try {
        const offers = await offerMock.read();

        const message = offers.map((offer) => `<li>${offer.title}</li>`).join(``);
        sendResponse(response, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        print.error(`Не удалось получить offers. Error: ${err}`);
        sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
      }
      break;
    }

    default: {
      sendResponse(response, HttpCode.NOT_FOUND, notFoundMessageText);
    }
  }
};

export const cliCommandServer = {
  name: `--server`,
  shortName: `-v`,
  description: `Выводит номер версии`,
  run(port: string): void {
    const serverPort = Number.parseInt(port, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
        .listen(serverPort, DEFAULT_HOST)
        .on(`listening`, (error: Error | undefined): void => {
          if (error !== undefined) {
            return print.error(`Ошибка при создании сервера: `, error);
          }

          return print.success(`Ожидаю соединений на ${DEFAULT_HOST}:${serverPort}`);
        });
  }
};
