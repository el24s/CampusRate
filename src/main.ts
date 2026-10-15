import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './configure-swagger';
import { ProblemDetailsFilter } from './commun/filters/problem-details.filter';
import helmet from 'helmet';
import * as fs from 'fs';
import path from 'path';

async function bootstrap() {
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, './certs/server.key')),
      cert: fs.readFileSync(path.join(__dirname, './certs/server.cert')),
    };

    const app = await NestFactory.create(AppModule, { httpsOptions });

    app.setGlobalPrefix('api/v1');

    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: false,
    }),
    );

    app.useGlobalFilters(new ProblemDetailsFilter());

    app.enableCors({
      origin: ['http://localhost:3000'],
      methods: 'GET,POST,PATCH,DELETE',
      allowedHeaders: ['Content-Type'],
    });

    app.use(helmet());

    configureSwagger(app);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
