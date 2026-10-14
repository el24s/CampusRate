import { Module } from '@nestjs/common';
import { PlacesModule } from './places/places.module';
import { AppreciationsModule } from './appreciations/appreciations.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      
    }),

    PlacesModule,
    AppreciationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}