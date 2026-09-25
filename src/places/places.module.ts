import { Module, forwardRef } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { AppreciationsModule } from '../appreciations/appreciations.module';

@Module({
  imports: [
    forwardRef(() => AppreciationsModule)
  ],
  providers: [PlacesService],
  controllers: [PlacesController]
})
export class PlacesModule {}
