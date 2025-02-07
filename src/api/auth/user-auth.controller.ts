import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AUTH_STRATEGIES } from '../../common/constants';
import {
  GetUser,
  UserFromRequest,
} from '../../common/decorators/get-user.decorator';
import { AuthService } from './auth.service';
import { UserRefreshTokenResponseDTO } from './dto/refresh/response.dto';
import { UserSignInRequestDTO } from './dto/sign-in/request.dto';
import { UserSignInResponseDTO } from './dto/sign-in/response.dto';
import { UserSignUpRequestDTO } from './dto/sign-up/request.dto';
import { UserSignUpResponseDTO } from './dto/sign-up/response.dto';

@Controller('user/auth')
@ApiTags('User / Auth')
export class UserAuthController {
  constructor(private service: AuthService) {}

  @Post('sign-in')
  @ApiOperation({ summary: 'User sign in' })
  @ApiOkResponse({ type: () => UserSignInResponseDTO })
  async signIn(
    @Body() dto: UserSignInRequestDTO,
  ): Promise<UserSignInResponseDTO> {
    const tokens = await this.service.signIn(dto);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Post('sign-up')
  @ApiOperation({ summary: 'User sign up' })
  @ApiOkResponse({ type: () => UserSignUpResponseDTO })
  async signUp(
    @Body() dto: UserSignUpRequestDTO,
  ): Promise<UserSignUpResponseDTO> {
    const tokens = await this.service.signUp(dto);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Post('refresh')
  @ApiOperation({ summary: 'User refresh tokens' })
  @ApiOkResponse({ type: () => UserRefreshTokenResponseDTO })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(AUTH_STRATEGIES.USER_REFRESH))
  async refresh(
    @GetUser() user: UserFromRequest,
  ): Promise<UserRefreshTokenResponseDTO> {
    return this.service.refresh(user.id);
  }
}
