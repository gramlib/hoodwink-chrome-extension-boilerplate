import { AbstractLogService, DEFAULT_LOG_LEVEL, ILogService, LogLevel } from './ILogService';

export class ConsoleLogService extends AbstractLogService implements ILogService {
  declare readonly _serviceBrand: undefined;

  constructor(logLevel: LogLevel = DEFAULT_LOG_LEVEL) {
    super();
    this.setLevel(logLevel);
  }

  trace(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Trace) {
      console.trace('%cTRACE', 'color: #888', message, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Debug) {
      console.debug('%cDEBUG', 'background: #eee; color: #888', message, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Info) {
      console.info('%c INFO', 'color: #33f', message, ...args);
    }
  }

  warn(message: string | Error, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Warning) {
      console.warn('%c WARN', 'color: #993', message, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Error) {
      console.error('%c  ERR', 'color: #f33', message, ...args);
    }
  }

  critical(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Critical) {
      console.log('%cCRITI', 'background: #f33; color: white', message, ...args);
    }
  }

  dispose(): void {
    // noop
  }

  flush(): void {
    // noop
  }
}
