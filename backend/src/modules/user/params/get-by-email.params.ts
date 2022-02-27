import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GetByEmailParams {
  @ApiProperty({ example: 'user@mail.ru', description: 'E-mail' })
  @IsEmail()
  email: string;
}
