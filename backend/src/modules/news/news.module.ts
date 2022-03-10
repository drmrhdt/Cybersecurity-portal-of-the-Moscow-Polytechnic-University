import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './entities/news.entity';

@Module({
  controllers: [NewsController],
  providers: [NewsRepository, NewsService],
  exports: [NewsService],
  imports: [SequelizeModule.forFeature([News])],
})
export class NewsModule {}
