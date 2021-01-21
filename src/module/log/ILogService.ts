/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createServiceDecorator } from '@hoodwink/common/instantiation/instantiation';
import { Disposable, IDisposable } from '@hoodwink/common/base/lifecycle';
import { Emitter, Event } from '@hoodwink/common/base/event';
import { URI } from '@hoodwink/common/base/uri';
import { toErrorMessage } from '@hoodwink/common/base/errorMessage';

export const ILogService = createServiceDecorator<ILogService>('logService');
export interface ILogService extends ILogger {
  readonly _serviceBrand: undefined;
}

export const ILoggerService = createServiceDecorator<ILoggerService>('loggerService');
export interface ILoggerService {
  readonly _serviceBrand: undefined;

  getLogger(file: URI): ILogger;
}

export function now(): string {
  return new Date().toLocaleTimeString();
}

export enum LogLevel {
  Trace,
  Debug,
  Info,
  Warning,
  Error,
  Critical,
  Off,
}

export const DEFAULT_LOG_LEVEL: LogLevel = LogLevel.Info;

export interface ILogger extends IDisposable {
  onDidChangeLogLevel: Event<LogLevel>;
  getLevel(): LogLevel;
  setLevel(level: LogLevel): void;

  trace(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string | Error, ...args: any[]): void;
  critical(message: string | Error, ...args: any[]): void;

  /**
   * An operation to flush the contents. Can be synchronous.
   */
  flush(): void;
}

export abstract class AbstractLogService extends Disposable {
  private level: LogLevel = DEFAULT_LOG_LEVEL;

  private readonly _onDidChangeLogLevel: Emitter<LogLevel> = this._register(
    new Emitter<LogLevel>(),
  );

  readonly onDidChangeLogLevel: Event<LogLevel> = this._onDidChangeLogLevel.event;

  setLevel(level: LogLevel): void {
    if (this.level !== level) {
      this.level = level;
      this._onDidChangeLogLevel.fire(this.level);
    }
  }

  getLevel(): LogLevel {
    return this.level;
  }
}

export class LogServiceAdapter extends AbstractLogService implements ILogService {
  declare readonly _serviceBrand: undefined;

  constructor(
    private readonly adapter: { consoleLog: (type: string, args: any[]) => void },
    logLevel: LogLevel = DEFAULT_LOG_LEVEL,
  ) {
    super();
    this.setLevel(logLevel);
  }

  trace(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Trace) {
      this.adapter.consoleLog('trace', [this.extractMessage(message), ...args]);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Debug) {
      this.adapter.consoleLog('debug', [this.extractMessage(message), ...args]);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Info) {
      this.adapter.consoleLog('info', [this.extractMessage(message), ...args]);
    }
  }

  warn(message: string | Error, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Warning) {
      this.adapter.consoleLog('warn', [this.extractMessage(message), ...args]);
    }
  }

  error(message: string | Error, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Error) {
      this.adapter.consoleLog('error', [this.extractMessage(message), ...args]);
    }
  }

  critical(message: string | Error, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Critical) {
      this.adapter.consoleLog('critical', [this.extractMessage(message), ...args]);
    }
  }

  private extractMessage(msg: string | Error): string {
    if (typeof msg === 'string') {
      return msg;
    }

    return toErrorMessage(msg, this.getLevel() <= LogLevel.Trace);
  }

  dispose(): void {
    // noop
  }

  flush(): void {
    // noop
  }
}
