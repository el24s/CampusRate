import { Module } from '@nestjs/common';
import { AppreciationsController } from './appreciations.controller';
import { AppreciationsService } from './appreciations.service';

@Module({
    providers:[AppreciationsService],
    controllers:[AppreciationsController]
})
export class AppreciationsModule {
    
}
