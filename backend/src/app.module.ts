import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

// МОДУЛИ
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';

// МОДЕЛИ БД
import { User } from './modules/user/models/user.model';
import { UserRoles } from './modules/role/models/user-role.model';
import { Role } from './modules/role/models/role.model';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RefreshToken } from './modules/auth/models/refresh-token.model';
import { FilesModule } from './modules/files/files.module';
import { NewsModule } from './modules/news/news.module';
import { News } from './modules/news/entities/news.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, RefreshToken, News],
      autoLoadModels: process.env.NODE_ENV === 'development',
      retryAttempts: 3,
      sync: { force: false },
    }),
    MulterModule.register({
      dest: './dist/static/photos',
    }),
    UserModule,
    RoleModule,
    AuthModule,
    FilesModule,
    NewsModule,
    // EmailModule,
  ],
})
export class AppModule {}
