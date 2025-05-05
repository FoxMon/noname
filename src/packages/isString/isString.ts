import { NarrowedType } from '../../core/types/narrowType';

/**
 * Checks the passed value is string.
 *
 * @param v - The passed parameter.
 *
 * @category Function
 */
export function isString<T>(v: T | string): v is NarrowedType<T, string> {
  return typeof v === 'string';
}
