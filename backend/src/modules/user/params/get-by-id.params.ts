import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class GetByIdParams {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsNumberString()
  userId: number;
}
