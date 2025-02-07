import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PASSWORD_REGEX } from '../../common/constants';

export class AuthDTO {
  @ApiProperty()
  @IsDefined()
  @IsEmail({ ignore_max_length: true })
  @MaxLength(255)
  email: string;

  @ApiProperty({ description: 'Password', minLength: 8, maxLength: 32 })
  @IsDefined()
  @IsString()
  @Matches(PASSWORD_REGEX, { message: 'Invalid password' })
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
