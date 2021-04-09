import split from 'split';
import { ThroughStream } from 'through';
import {
  createLogger,
  format,
  Logger,
  transports as transportConstructors,
} from 'winston';
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports';

interface LoggerWithStream extends Logger {
  writeStream?: ThroughStream;
}

const logFormat = format.combine(
  format.colorize(),
  format.simple(),
  format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS',
  }),
  format.errors({ stack: true }),
  format.printf((info) =>
    info.stack
      ? // eslint-disable-next-line
        `${info.timestamp} ${info.level}: ${info.message}\n${info.stack}`
      : // eslint-disable-next-line
        `${info.timestamp} ${info.level}: ${info.message}`,
  ),
  format.splat(),
);

const transports: Array<FileTransportInstance | ConsoleTransportInstance> = [];
if (process.env.NODE_ENV === 'test') {
  transports.push(
    new transportConstructors.File({
      filename: 'log/test.log',
      level: 'debug',
    }),
  );
} else {
  transports.push(
    new transportConstructors.File({
      format: logFormat,
      filename: 'log/debug.log',
      level: 'debug',
    }),
  );
  transports.push(
    new transportConstructors.File({
      format: logFormat,
      filename: 'log/main.log',
    }),
  );
}

if (process.env.NODE_ENV === 'development') {
  transports.push(
    new transportConstructors.Console({
      format: logFormat,
      level: 'debug',
    }),
  );
}

const logger: LoggerWithStream = createLogger({
  level: 'info',
  format: logFormat,
  transports,
});
logger.writeStream = split().on('data', (msg) => logger.info(msg));

export default logger;
