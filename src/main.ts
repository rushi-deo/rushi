import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.enableVersioning({ type: VersioningType.URI, prefix: 'api/v' });
  app.use(helmet());
  app.use(cookieParser());
  app.use('/assets', express.static(join(process.cwd(), 'public/assets')));
  app.use('/branding', express.static(join(process.cwd(), 'src/branding')));
  app.use(
    pinoHttp({
      level: process.env.LOG_LEVEL || 'info',
      redact: ['req.headers.authorization', 'req.headers.cookie'],
    }),
  );
  app.enableCors({
    origin: (process.env.CORS_ORIGINS || '').split(',').filter(Boolean),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Visa Matrix ERP API')
    .setDescription('Enterprise ERP Backend API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Visa Matrix ERP API Docs',
    customCssUrl: '/branding/swagger-theme.css',
    customfavIcon: '/assets/visa-matrix-logo.svg',
  });

  await app.listen(Number(process.env.PORT || 3000));
}

bootstrap();
