import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { col, fn, where } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-info.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersRepository {
  private readonly saltRounds = 10;

  constructor(@InjectModel(User) private users: typeof User) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  public async findAll(): Promise<User[] | null> {
    return this.users.scope(['defaultScope', 'withRole', 'allUsers']).findAll();
  }

  public async findById(
    id: number,
    withPassword = false,
  ): Promise<User | null> {
    return this.users
      .scope([withPassword ? 'withPassword' : 'defaultScope', 'withRole'])
      .findOne({
        where: { _id: id },
      });
  }

  public async deleteById(id: number): Promise<number | null> {
    return this.users.destroy({ where: { _id: id } });
  }

  public async findByEmail(
    email: string,
    withPassword = false,
  ): Promise<User | null> {
    return this.users
      .scope([withPassword ? 'withPassword' : 'defaultScope', 'withRole'])
      .findOne({
        where: {
          email: where(fn('lower', col('email')), email.trim().toLowerCase()),
        },
      });
  }

  public async create({ password, ...dto }: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(password);

    return this.users.create({
      ...dto,
      email: dto.email.trim().toLowerCase(),
      password: hashedPassword,
    });
  }

  public async update(
    id: number,
    dto: UpdateUserDto,
  ): Promise<[affectedCount: number]> {
    return this.users.update(dto, { where: { _id: id } });
  }
}
