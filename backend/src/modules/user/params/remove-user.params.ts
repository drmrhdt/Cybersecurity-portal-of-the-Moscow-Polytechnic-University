import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class RemoveUserParams {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsNumberString()
  userId: number;
}
