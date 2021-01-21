import * as strings from '@hoodwink/common/base/strings';

export function propertyIsEvent(name: string): boolean {
  // Assume a property is an event if it has a form of "onSomething"
  return name[0] === 'o' && name[1] === 'n' && strings.isUpperAsciiLetter(name.charCodeAt(2));
}
