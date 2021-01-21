import { Disposable } from '@hoodwink/common/base/lifecycle';
import { Event } from '@hoodwink/common/base/event';
import { ILogService, LogLevel } from './ILogService';

export class DelegatedLogService extends Disposable implements ILogService {
  declare readonly _serviceBrand: undefined;

  constructor(private logService: ILogService) {
    super();
    this._register(logService);
  }

  get onDidChangeLogLevel(): Event<LogLevel> {
    return this.logService.onDidChangeLogLevel;
  }

  setLevel(level: LogLevel): void {
    this.logService.setLevel(level);
  }

  getLevel(): LogLevel {
    return this.logService.getLevel();
  }

  trace(message: string, ...args: any[]): void {
    this.logService.trace(message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.logService.debug(message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.logService.info(message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.logService.warn(message, ...args);
  }

  error(message: string | Error, ...args: any[]): void {
    this.logService.error(message, ...args);
  }

  critical(message: string | Error, ...args: any[]): void {
    this.logService.critical(message, ...args);
  }

  flush(): void {
    this.logService.flush();
  }
}
