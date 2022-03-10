import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
constructor(private readonly newsRepository: NewsRepository){}

  create(createNewsDto: CreateNewsDto) {
    return createNewsDto;
  }

  findAll() {
    return this.newsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
