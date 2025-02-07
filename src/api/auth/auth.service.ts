import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { compareWithHash, generateHash } from '../../common/crypto/hash.utils';
import { UserRepository } from '../../db/sql/repositories/user/user.repository';
import { Features } from '../../features/features.service';
import { UserSignInRequestDTO } from './dto/sign-in/request.dto';
import { UserSignUpRequestDTO } from './dto/sign-up/request.dto';

@Injectable()
export class AuthService {
  constructor(
    private db: UserRepository,
    private features: Features,
  ) {}

  async signIn(dto: UserSignInRequestDTO) {
    const { email, password } = dto;
    const user = await this.db.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCorrectPassword = await compareWithHash(password, user.password);
    if (!isCorrectPassword)
      throw new BadRequestException('Wrong email or password');

    return this.features.user.auth.issueTokens.execute({ user });
  }

  async signUp(dto: UserSignUpRequestDTO) {
    const { email, password } = dto;
    const user = await this.db.findByEmail(email);

    if (user) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await generateHash(password);

    const newUser = await this.db.create({ email, password: hashedPassword });

    return this.features.user.auth.issueTokens.execute({ user: newUser });
  }

  async refresh(userId: string) {
    const user = await this.db.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.features.user.auth.issueTokens.execute({ user });
  }
}
