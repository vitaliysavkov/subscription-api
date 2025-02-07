import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokensDTO {
  @ApiProperty({
    description: "JWT access token. Attach it to 'Authorization' headers for endpoints requiring authorization",
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    description:
      "JWT refresh token. Token to refresh access token. Send it to appropriate 'refresh-token' endpoint once your access token expires",
  })
  @Expose()
  refreshToken: string;
}
