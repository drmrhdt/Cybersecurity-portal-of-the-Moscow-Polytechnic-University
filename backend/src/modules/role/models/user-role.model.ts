import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

// МОДЕЛИ БД
import { User } from '../../user/models/user.model';
import { Role } from './role.model';

interface UserRolesCreationAttrs {
  role_id: number;
  user_id: number;
}

interface UserRolesAttrs {
  _id: number;
  role_id: number;
  user_id: number;
}

@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRolesAttrs, UserRolesCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ForeignKey(() => Role)
  @Column({
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  role_id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user_id: number;
}
