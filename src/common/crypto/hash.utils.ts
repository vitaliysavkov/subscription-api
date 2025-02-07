import * as bcrypt from 'bcrypt';

export function generateHash(value: string): Promise<string> {
  return bcrypt.hash(value, 10);
}

export function compareWithHash(value: string, hashedValue: string): Promise<boolean> {
  return bcrypt.compare(value, hashedValue);
}
