import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

// DTO
import { CreateRoleDto } from './dto/create-role.dto';

// МОДЕЛИ БД
import { Role } from './models/role.model';
import { UserRoles } from './models/user-role.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(UserRoles) private userRolesRepository: typeof UserRoles,
  ) {}

  async createRole(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto);
  }

  async getAllRoles() {
    return await this.roleRepository.findAll();
  }

  async getRoleByValue(name: string) {
    return await this.roleRepository.findOne({ where: { name } });
  }

  async setRoleToUser(userId: number, roleName: string) {
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });

    if (!role) {
      throw new HttpException(
        `Роли пользователя '${roleName}' не существует`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const userRole = await this.userRolesRepository.findOne({
      where: { user_id: userId, role_id: role._id },
    });

    if (!!userRole) {
      throw new HttpException(
        `У пользователя уже есть роль '${roleName}'`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRolesRepository.create({
      user_id: userId,
      role_id: role._id,
    });
  }

  async removeRolesFromUser(userId: number, roleNames: string[]) {
    const rolesList = await this.getAllRoles();
    const roleIds: number[] = [];
    rolesList.forEach((role) => {
      if (roleNames.includes(role.name)) {
        roleIds.push(role._id);
      }
    });

    await this.userRolesRepository.destroy({
      where: {
        user_id: userId,
        role_id: {
          [Op.in]: roleIds,
        },
      },
    });
  }

  async removeAllRolesFromUser(userId: number) {
    await this.userRolesRepository.destroy({
      where: {
        user_id: userId,
      },
    });
  }
}
