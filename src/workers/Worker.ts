import logger from '../utilities/logger';
import { sleep } from '../utilities/sleep';

class Worker {
  constructor(
    name: string,
    runLoopInterval = 500,
    restartInterval = 1,
    hardKillTimeout = 15,
  ) {
    this.ver = 0.1;
    this.runLoopInterval = runLoopInterval;
    this.restartInterval = restartInterval;
    this.hardKillTimeout = hardKillTimeout;
    this._reloadSignalled = false;
    this._stopSignalled = false;
    this.name = name;
  }

  ver: number;
  runLoopInterval: number;
  restartInterval: number;
  hardKillTimeout: number;
  _reloadSignalled: boolean;
  _stopSignalled: boolean;
  name: string;

  _sigtermHandler = (): void => {
    this._stopSignalled = true;
  };

  _reloadHandler = (): void => {
    this._reloadSignalled = true;
  };

  async start(): Promise<void> {
    this._processStartup();
    await this._startup();
    await this._runLoop();
    await this._shutdown();
    this._processShutdown();
  }

  _processStartup(): void {
    process.on('SIGINT', this._sigtermHandler);
    process.on('SIGTERM', this._sigtermHandler);
    process.on('SIGHUP', this._reloadHandler);
  }

  status(): void {
    //
  }

  reload(): void {
    //
  }

  stop(): void {
    //
  }

  restart(): void {
    //
  }

  async _runLoop(): Promise<void> {
    try {
      logger.info('Daemon process starting loop');
      while (!this._stopSignalled) {
        await this.run();
        await sleep(this.runLoopInterval);
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async _startup(): Promise<void> {
    //
  }

  async _shutdown(): Promise<void> {
    //
  }

  async run(): Promise<void> {
    //
  }

  _processShutdown(): void {
    logger.info('Daemon process has stopped loop');
    process.exit(0);
  }
}

export default Worker;
