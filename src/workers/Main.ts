import models from '../models';
import logger from '../utilities/logger';
import Worker from './Worker';
const { LoggedError } = models;

class Main extends Worker {
  constructor() {
    super('Main');
    this._initialized = false;
  }

  _initialized: boolean;

  async run(): Promise<void> {
    try {
      if (this._reloadSignalled) {
        this._reload();
      }
      if (!this._initialized) {
        await this._initialize();
      }
    } catch (error) {
      await LoggedError.handleError({
        error,
        key: 'MAIN_RUN_ERROR',
        severity: 'critical',
      });
    }
  }

  async _initialize(): Promise<void> {
    this._initialized = true;
  }

  _reload(): void {
    logger.info('Reloading...');
    this._reloadSignalled = false;
    this._initialized = false;
  }

  async _shutdown(): Promise<void> {
    try {
      logger.info('Shutdown complete');
    } catch (error) {
      logger.error('Shutdown failed');
      logger.error(error);
    }
  }
}

export default Main;
