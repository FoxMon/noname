import { NarrowedType } from '../../core/types/narrowType';

export function isString<T>(v: T | string): v is NarrowedType<T, string> {
  return typeof v === 'string';
}
