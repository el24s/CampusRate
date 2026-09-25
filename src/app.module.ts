import { Module } from '@nestjs/common';
import { PlacesModule } from './places/places.module';
import { AppreciationsModule } from './appreciations/appreciations.module';
import { DatabaseService } from './commun/service/database.service'; // Ajuste selon ton chemin exact

@Module({
  imports: [
    PlacesModule,
    AppreciationsModule,
  ],
  controllers: [],
  providers: [
    DatabaseService,
  ],
})
export class AppModule {}