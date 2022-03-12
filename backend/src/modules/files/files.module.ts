import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesService } from './files.service';
import { File } from './entities/file.entity'
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
  imports: [SequelizeModule.forFeature([File])],
})
export class FilesModule {}
