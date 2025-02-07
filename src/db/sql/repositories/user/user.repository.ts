import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'objection';

import { UserModelFields } from '../../../../common/types/models/user';
import { UserModel } from '../../models/user/user.model';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(UserModel.name) private readonly userModel: typeof UserModel,
  ) {}

  async findById(
    id: string,
    transaction?: Transaction,
  ): Promise<UserModelFields | void> {
    return this.userModel.query(transaction).findById(id);
  }

  async findByEmail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserModelFields | void> {
    return this.userModel.query(transaction).findOne({ email });
  }

  async create(
    user: Omit<UserModelFields, 'id' | 'createdAt' | 'updatedAt'>,
    transaction?: Transaction,
  ): Promise<UserModelFields> {
    return this.userModel.query(transaction).insert(user);
  }
}
