import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Public } from '../auth/decorators/public-url.decorator';

import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

const DESTINATION = './dist/static/photos';

@ApiTags('Файлы')
@Controller('files')
export class FilesController {
  constructor() {}

  @ApiOperation({ summary: 'Сохранение одного файла' })
  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: DESTINATION,
        filename: editFileName,
      }),
      // fileFilter: imageFileFilter,
      // todo добавить проверку расширения
    }),
  )
  async uploadedFile(@UploadedFile() file: Express.Multer.File) {
    const response = '/dist/static/photos/' + file?.fieldname;
    return response;
  }

  @ApiOperation({ summary: 'Сохранение нескольких фото' })
  @Public()
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('file', 5, {
      storage: diskStorage({
        destination: DESTINATION,
        filename: editFileName,
      }),
      // fileFilter: imageFileFilter,
      // todo добавить проверку расширения
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const response = [];
    files?.forEach((file) => {
      const fileReponse = '/photos/' + file?.filename;
      response.push(fileReponse);
    });
    return response;
  }
}
