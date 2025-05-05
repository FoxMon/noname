import { NarrowedType } from '../../core/types/narrowType';

/**
 * Check if the passed value is nullish then returns `true`.
 *
 * @param v - The passed parameter.
 *
 * @category Function
 */
export function isNullish<T>(v: T | null | undefined): v is NarrowedType<T, null | undefined> {
  return v === null || v === undefined;
}
