import { isWindows } from '@hoodwink/common/base/platform';
import { AbstractLogService, DEFAULT_LOG_LEVEL, ILogService, LogLevel, now } from './ILogService';

export class ConsoleLogMainService extends AbstractLogService implements ILogService {
  declare readonly _serviceBrand: undefined;

  private useColors: boolean;

  constructor(logLevel: LogLevel = DEFAULT_LOG_LEVEL) {
    super();
    this.setLevel(logLevel);
    this.useColors = !isWindows;
  }

  trace(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Trace) {
      if (this.useColors) {
        console.log(`\x1b[90m[main ${now()}]\x1b[0m`, message, ...args);
      } else {
        console.log(`[main ${now()}]`, message, ...args);
      }
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Debug) {
      if (this.useColors) {
        console.log(`\x1b[90m[main ${now()}]\x1b[0m`, message, ...args);
      } else {
        console.log(`[main ${now()}]`, message, ...args);
      }
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Info) {
      if (this.useColors) {
        console.log(`\x1b[90m[main ${now()}]\x1b[0m`, message, ...args);
      } else {
        console.log(`[main ${now()}]`, message, ...args);
      }
    }
  }

  warn(message: string | Error, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Warning) {
      if (this.useColors) {
        console.warn(`\x1b[93m[main ${now()}]\x1b[0m`, message, ...args);
      } else {
        console.warn(`[main ${now()}]`, message, ...args);
      }
    }
  }

  error(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Error) {
      if (this.useColors) {
        console.error(`\x1b[91m[main ${now()}]\x1b[0m`, message, ...args);
      } else {
        console.error(`[main ${now()}]`, message, ...args);
      }
    }
  }

  critical(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Critical) {
      if (this.useColors) {
        console.error(`\x1b[90m[main ${now()}]\x1b[0m`, message, ...args);
      } else {
        console.error(`[main ${now()}]`, message, ...args);
      }
    }
  }

  dispose(): void {
    // noop
  }

  flush(): void {
    // noop
  }
}
