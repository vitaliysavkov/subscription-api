import { BadRequestException, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const handleValidationErrors = (errors: ValidationError[]) => {
  return new BadRequestException({
    statusCode: 400,
    error: 'Bad Request',
    message: 'Validation failed',
    errors: errors,
  });
};

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  transform: true,
  skipMissingProperties: false,
  whitelist: true,
  validationError: {
    target: false,
    value: false,
  },
  exceptionFactory: handleValidationErrors,
};
