import { Module, forwardRef } from '@nestjs/common';
import { AppreciationsController } from './appreciations.controller';
import { AppreciationsService } from './appreciations.service';
import { PlacesModule } from '../places/places.module';

@Module({
    imports: [
        forwardRef(() => PlacesModule)
    ],
    providers:[AppreciationsService],
    controllers:[AppreciationsController],
    exports:[AppreciationsService]
})
export class AppreciationsModule {
    
}
