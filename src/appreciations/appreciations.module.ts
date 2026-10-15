import { forwardRef, Module } from '@nestjs/common';
import { AppreciationsController } from './appreciations.controller';
import { AppreciationsService } from './appreciations.service';
import { PlacesModule } from '../places/places.module';
import { AppreciationsRepository } from './appreciations.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Appreciation, AppreciationsSchema } from './schemas/appreciations.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Appreciation.name, schema: AppreciationsSchema}]),
        forwardRef(() => PlacesModule),
    ],
    controllers:[AppreciationsController],
    providers:[AppreciationsService, AppreciationsRepository],
    exports:[AppreciationsService, AppreciationsRepository]
})
export class AppreciationsModule {
    
}
