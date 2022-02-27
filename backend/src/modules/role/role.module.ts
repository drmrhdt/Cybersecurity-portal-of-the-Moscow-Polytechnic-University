import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

// СЕРВИСЫ
import { RolesService } from './role.service';

// КОНТРОЛЛЕРЫ
import { RolesController } from './role.controller';

// МОДЕЛИ БД
import { User } from '../user/models/user.model';
import { UserRoles } from './models/user-role.model';
import { Role } from './models/role.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RoleModule {}
