import { AbstractLogService, ILogService, LogLevel } from './ILogService';

export class MultiplexLogService extends AbstractLogService implements ILogService {
  declare readonly _serviceBrand: undefined;

  constructor(private readonly logServices: readonly ILogService[]) {
    super();
    if (logServices.length) {
      this.setLevel(logServices[0].getLevel());
    }
  }

  setLevel(level: LogLevel): void {
    for (const logService of this.logServices) {
      logService.setLevel(level);
    }
    super.setLevel(level);
  }

  trace(message: string, ...args: any[]): void {
    for (const logService of this.logServices) {
      logService.trace(message, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    for (const logService of this.logServices) {
      logService.debug(message, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    for (const logService of this.logServices) {
      logService.info(message, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    for (const logService of this.logServices) {
      logService.warn(message, ...args);
    }
  }

  error(message: string | Error, ...args: any[]): void {
    for (const logService of this.logServices) {
      logService.error(message, ...args);
    }
  }

  critical(message: string | Error, ...args: any[]): void {
    for (const logService of this.logServices) {
      logService.critical(message, ...args);
    }
  }

  flush(): void {
    for (const logService of this.logServices) {
      logService.flush();
    }
  }

  dispose(): void {
    for (const logService of this.logServices) {
      logService.dispose();
    }
  }
}
