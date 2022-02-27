import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Иван', description: 'имя' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly name?: string;

  @ApiProperty({ example: 'Петров', description: 'фамилия' })
  @IsOptional()
  @IsString({ message: 'Должно быть строкой' })
  readonly surname?: string;
}
