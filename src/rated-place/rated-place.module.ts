import { Module } from '@nestjs/common';
import { RatedPlaceService } from './rated-place.service';
import { RatedPlaceController } from './rated-place.controller';

@Module({
  providers: [RatedPlaceService],
  controllers: [RatedPlaceController]
})
export class RatedPlaceModule {}
