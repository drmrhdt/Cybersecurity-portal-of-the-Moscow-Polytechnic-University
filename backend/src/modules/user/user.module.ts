import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// МОДЕЛИ БД
import { User } from './models/user.model';
import { Role } from '../role/models/role.model';
import { UserRoles } from '../role/models/user-role.model';

// МОДУЛИ
import { RoleModule } from '../role/role.module';
import { AuthModule } from '../auth/auth.module';

// КОНТРОЛЛЕРЫ
import { UsersController } from './user.controller';

// СЕРВИСЫ
import { UsersService } from './user.service';

// РЕПОЗИТОРИИ
import { UsersRepository } from './user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RoleModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UserModule {}
