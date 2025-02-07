import { Transform } from 'class-transformer';

export function TransformArray() {
  return Transform(({ value }) => (value && !Array.isArray(value) ? [value] : value));
}
