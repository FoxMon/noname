import type { Evaluator } from './types/evaluator.type';

export function dataLastImpl(
  fn: (...args: any) => unknown,
  args: ReadonlyArray<unknown>,
  lazy?: (...args: any) => Evaluator,
): unknown {
  const dataLast = (data: unknown): unknown => fn(data, ...args);

  return lazy === undefined ? dataLast : Object.assign(dataLast, { lazy, lazyArgs: args });
}
