/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IAction } from '@hoodwink/common/base/actions';

export interface IErrorOptions {
  actions?: readonly IAction[];
}

export interface IErrorWithActions {
  actions?: readonly IAction[];
}

export function isErrorWithActions(obj: unknown): obj is IErrorWithActions {
  return obj instanceof Error && Array.isArray((obj as IErrorWithActions).actions);
}

export function createErrorWithActions(
  message: string,
  options: IErrorOptions = Object.create(null),
): Error & IErrorWithActions {
  const result = new Error(message);

  if (options.actions) {
    (<IErrorWithActions>result).actions = options.actions;
  }

  return result;
}
