import { Emitter, Event } from '@hoodwink/common/base/event';
import { ILogService, LogLevel } from './ILogService';

export class NullLogService implements ILogService {
  declare readonly _serviceBrand: undefined;

  readonly onDidChangeLogLevel: Event<LogLevel> = new Emitter<LogLevel>().event;

  setLevel(level: LogLevel): void {}

  getLevel(): LogLevel {
    return LogLevel.Info;
  }

  trace(message: string, ...args: any[]): void {}

  debug(message: string, ...args: any[]): void {}

  info(message: string, ...args: any[]): void {}

  warn(message: string, ...args: any[]): void {}

  error(message: string | Error, ...args: any[]): void {}

  critical(message: string | Error, ...args: any[]): void {}

  dispose(): void {}

  flush(): void {}
}
