import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'files' })
export class File extends Model {
  @ApiProperty({ example: 1, description: 'Уникальный id' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @ApiProperty({ example: 'text', description: 'Название файла' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fileName: string;

  @ApiProperty({ example: 'text', description: 'Путь к папке' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filePath: string;
}
