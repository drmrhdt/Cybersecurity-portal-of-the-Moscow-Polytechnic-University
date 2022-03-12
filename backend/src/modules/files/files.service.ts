import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file, extension: string, folder: string): Promise<string> {
    try {
      const fileName = uuid.v4() + '.' + extension;
      const filePath = path.resolve(__dirname, '..', '..', 'static', folder);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteFile(fileName: string, folder: string) {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      'static',
      folder,
      fileName,
    );
    if (fs.existsSync(filePath)) {
      return fs.unlinkSync(filePath);
    }
  }

  async createPhoto(file): Promise<string> {
    console.log(file)
    return await this.createFile(file, 'png', 'photos');
  }

  async deletePhoto(fileName: string): Promise<void> {
    return await this.deleteFile(fileName, 'photos');
  }
}
