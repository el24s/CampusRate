import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { DatabaseModule } from '../commun/module/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PlacesService],
  controllers: [PlacesController],
  exports: [PlacesService]
})
export class PlacesModule {}
