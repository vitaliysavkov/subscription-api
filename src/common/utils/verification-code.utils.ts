import * as crypto from 'node:crypto';

export const generateVerificationCode = () => crypto.randomInt(100_000, 999_999).toString();
