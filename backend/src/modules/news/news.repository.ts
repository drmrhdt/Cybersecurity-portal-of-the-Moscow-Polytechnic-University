import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsRepository {
  constructor(@InjectModel(News) private news: typeof News) {}

  public async findAll(): Promise<News[] | null> {
    return this.news.findAll();
  }

  public async create({ ...dto }: CreateNewsDto): Promise<News> {
    return this.news.create({
      ...dto,
    });
  }
}
