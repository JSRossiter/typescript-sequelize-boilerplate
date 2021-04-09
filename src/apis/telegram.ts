import TelegramBot from 'node-telegram-bot-api';
import { sequelize } from '../models';
import { LoggedErrorStatic } from '../models/LoggedError';
import logger from '../utilities/logger';

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {
  polling: Boolean(process.env.TELEGRAM_POLLING),
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  logger.debug(`msg from ${chatId}: %O`, msg);
});

const chatIds = {
  default: process.env.TELEGRAM_CHAT_ID,
};

export const telegramAlert = async (
  message: string,
  chat: keyof typeof chatIds = 'default',
): Promise<void> => {
  try {
    await bot.sendMessage(chatIds[chat], message, { parse_mode: 'HTML' });
  } catch (error) {
    await (sequelize.models.LoggedError as LoggedErrorStatic).handleError({
      error: error as Error,
      key: 'TELEGRAM_ALERT_ERROR',
    });
  }
};

export default bot;
