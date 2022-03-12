import {
    Body,
    Controller,
    Post
  } from '@nestjs/common';
  import {
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
  
  // ENUMS
import { Public } from '../auth/decorators/public-url.decorator';
import { FilesService } from './files.service';
  
  @ApiTags('Файлы')
  @Controller('files')
  export class FilesController {
    constructor(private filesService: FilesService) {}
  
    @ApiOperation({ summary: 'Создание фото' })
    @Public()
    @Post()
    async create(@Body() fileDto: { file: string }) {
      return await this.filesService.createPhoto(fileDto.file);
    }
  }
  