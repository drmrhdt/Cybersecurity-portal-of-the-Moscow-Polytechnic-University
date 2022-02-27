import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

// МОДЕЛИ БД
import { User } from 'src/modules/user/models/user.model';

interface RefreshTokenCreationAttrs {
  expires: Date;
  user_id: number;
}

interface RefreshTokenAttrs {
  _id: number;
  token: string;
  is_revoked: boolean;
  expires: Date;
  user_id: number;
}

@Table({ tableName: 'refresh_tokens', createdAt: false, updatedAt: false })
export class RefreshToken extends Model<
  RefreshTokenAttrs,
  RefreshTokenCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({
    example: 1,
    description: 'Можно ли отозвать токен',
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false, allowNull: false })
  is_revoked: boolean;

  @ApiProperty({
    example: '2021-05-12T06:57:24.059Z',
    description: 'Время жизни токена',
  })
  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  })
  expires: Date;

  @ForeignKey(() => User)
  @Column
  user_id: number;
}
