import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// МОДЕЛИ БД
import { User } from './models/user.model';

// GUARDS
import { RolesGuard } from '../auth/guards/roles.guard';

// ДЕКОРАТОРЫ
import { Roles } from '../auth/decorators/roles-auth.decorator';

// СЕРВИСЫ
import { UsersService } from './user.service';

// DTO
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { UpdateUserDto } from './dto/update-info.dto';
import { CheckEmailDto } from './dto/check-email.dto';

// PARAMS
import { AddRoleParams } from './params/add-role.params';
import { UpdateInfoParams } from './params/update-info.params';
import { RemoveUserParams } from './params/remove-user.params';
import { RemoveRolesParams } from './params/remove-roles.params';
import { GetByIdParams } from './params/get-by-id.params';
import { Public } from '../auth/decorators/public-url.decorator';

// ENUMS
import { defaultRoles } from 'src/enums/defaultRoles.enum';
import { CurrentUser } from '../auth/decorators/user.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Проверить существование почты' })
  @ApiResponse({ status: 200, type: Boolean })
  @Public()
  @Get('/check-email')
  async checkEmail(@Query() dto: CheckEmailDto) {
    return await this.usersService.isEmailAlreadyUsed(dto.email);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getAll() {
    return await this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить данные пользователя по токену' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @Get('/by-token')
  async getUserInfo(@CurrentUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'Получить данные пользователя по id' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':userId')
  async getById(@Param() params: GetByIdParams) {
    return await this.usersService.getUserById(params.userId);
  }

  @ApiOperation({ summary: 'Изменение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @ApiBearerAuth()
  @Put('/:userId')
  async updateInfo(
    @Param() params: UpdateInfoParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUserData(params.userId, updateUserDto);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:userId')
  async removeUser(@Param() params: RemoveUserParams) {
    return await this.usersService.removeUser(params.userId);
  }

  @ApiOperation({ summary: 'Выдать роль пользователю' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Post('/:userId/add-role')
  async addRole(@Param() params: AddRoleParams, @Body() dto: AddRoleDto) {
    return await this.usersService.addRole(params.userId, dto);
  }

  @ApiOperation({ summary: 'Удалить роли у пользователя' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(defaultRoles.ADMIN)
  @UseGuards(RolesGuard)
  @Delete('/:userId/remove-roles')
  async removeRoles(
    @Param() params: RemoveRolesParams,
    @Body(new ParseArrayPipe({ items: String }))
    dto: string[],
  ) {
    return await this.usersService.removeRoles(params.userId, dto);
  }
}
