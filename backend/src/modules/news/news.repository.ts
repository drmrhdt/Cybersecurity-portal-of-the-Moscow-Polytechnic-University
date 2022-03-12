import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
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

  public async findById(
    id: number
  ): Promise<News | null> {
    return this.news
      .findOne({
        where: { _id: id },
      });
  }

  public async deleteById(id: number): Promise<number | null> {
    return this.news.destroy({ where: { _id: id } });
  }

  public async update(
    id: number,
    dto: UpdateNewsDto,
  ): Promise<[affectedCount: number]> {
    return this.news.update(dto, { where: { _id: id } });
  }
}
