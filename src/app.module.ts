import { Module } from '@nestjs/common';
import { PlacesModule } from './places/places.module';
import { AppreciationsModule } from './appreciations/appreciations.module';
import { DatabaseService } from './commun/service/database.service'; // Ajuste selon ton chemin exact
import { DatabaseModule } from './commun/module/database.module';

@Module({
  imports: [
    PlacesModule,
    AppreciationsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}