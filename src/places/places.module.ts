import { forwardRef, Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { PlacesRepository } from './places.repository';
import { AppreciationsModule } from '../appreciations/appreciations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlacesSchema } from './schemas/places.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Place.name, schema:PlacesSchema}]),
    forwardRef(() => AppreciationsModule),
  ],
  providers: [PlacesService, PlacesRepository],
  controllers: [PlacesController],
  exports: [PlacesService, PlacesRepository]
})
export class PlacesModule {}
