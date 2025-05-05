export function curryOn<T>(
  isArgs: (data: unknown) => data is T,
  impl: (data: unknown, firstArg: T, ...args: any) => unknown,
  ...args: ReadonlyArray<unknown>
): unknown {
  return isArgs(args[0])
    ? // @ts-expect-error
      (data: unknown) => impl(data, ...args)
    : // @ts-expect-error
      impl(...args);
}
