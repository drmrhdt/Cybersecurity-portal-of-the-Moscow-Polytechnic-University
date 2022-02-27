import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 'USER', description: 'Выдаваемая пользователю роль' })
  @IsString({ message: 'Должно быть строкой' })
  readonly value: string;
}
