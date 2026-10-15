import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './configure-swagger';
import { ProblemDetailsFilter } from './commun/filters/problem-details.filter';
import helmet from 'helmet';
import * as fs from 'fs';
import path from 'path';
import * as http from 'http'

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
      origin: ['https://localhost:3000'],
      methods: 'GET,POST,PATCH,DELETE',
      allowedHeaders: ['Content-Type'],
    });

    app.use(helmet());

    const HTTPS_PORT = Number(process.env.PORT ?? 3000);
    const HTTP_PORT = Number(process.env.HTTP_PORT ?? 3080);
    
    configureSwagger(app);
    await app.listen(HTTPS_PORT);
    http
      .createServer((req, res) => {
        const host = (req.headers.host ?? 'localhost').replace(/:\d+$/, '');
        res.writeHead(308, {
          Location: `https://${host}:${HTTPS_PORT}${req.url}`,
        });
        res.end();
      })
      .listen(HTTP_PORT, () => {
      })
    
}
bootstrap();
