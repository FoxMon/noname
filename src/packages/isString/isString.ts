import { NarrowedType } from '../../core/types/narrowType';

/**
 * Check if the passed value is string then returns `true`.
 *
 * @param v - The passed parameter.
 *
 * @category Function
 */
export function isString<T>(v: T | string): v is NarrowedType<T, string> {
  return typeof v === 'string';
}
