import { Module } from '@nestjs/common';
import { AppreciationsController } from './appreciations.controller';
import { AppreciationsService } from './appreciations.service';
import { DatabaseModule } from '../commun/module/database.module';
import { PlacesModule } from '../places/places.module';

@Module({
    imports: [DatabaseModule, PlacesModule],
    controllers:[AppreciationsController],
    providers:[AppreciationsService],
    exports:[AppreciationsService]
})
export class AppreciationsModule {
    
}
