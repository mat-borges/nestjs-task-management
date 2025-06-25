import * as bcrypt from 'bcrypt';

import { DataSource, Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';

import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { User } from './user.entity';
import { logUnknownError } from '../common/utils/log-error.util';

@Injectable()
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository');
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      logUnknownError(this.logger, 'create user', { username }, '', error);
    }
  }
}
