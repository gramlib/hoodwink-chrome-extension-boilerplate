export function localize(...args: Array<string | number | undefined | {}>) {
  return args.filter(Boolean).join('\n');
}
