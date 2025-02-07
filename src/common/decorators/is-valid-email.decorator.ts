import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsValidEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          const emailRegex =
            /^(?!.*\.\.)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

          if (!emailRegex.test(value)) {
            return false;
          }

          const [localPart, domainPart] = value.split('@');

          if (localPart.length > 64) {
            return false;
          }

          if (domainPart.length > 255) {
            return false;
          }

          const domainParts = domainPart.split('.');
          return domainParts.every((part) => {
            if (part.length > 63 || part.length === 0) {
              return false;
            }

            return !(part.startsWith('-') || part.endsWith('-') || part.includes('--'));
          });
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid email address`;
        },
      },
    });
  };
}
