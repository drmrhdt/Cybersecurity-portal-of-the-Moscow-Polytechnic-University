import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import express, { json, urlencoded } from 'express';
import { join } from 'path';

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create(AppModule);
    app.enableCors({ credentials: true });
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    app.use(cookieParser());

    app.setGlobalPrefix('api/v1');

    const config = new DocumentBuilder()
      .setTitle('CyberSport Portal')
      .setDescription('Документация REST API')
      .setVersion('1.0.1')
      .addCookieAuth('refresh_token')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () =>
      console.log(
        `Server started on http://127.0.0.1:${PORT}/api/v1 \nAPI Docs on http://127.0.0.1:${PORT}/api/docs`,
      ),
    );
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
