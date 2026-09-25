import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configureSwagger } from './configure-swagger';
import { ProblemDetailsFilter } from './commun/filters/problem-details.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
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

    // configureApp(app);
    await app.listen(process.env.PORT ?? 3000);
    configureSwagger(app);
}
bootstrap();
