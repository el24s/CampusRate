    import { INestApplication } from '@nestjs/common';
    import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

    export function configureSwagger(app: INestApplication): void {
      const config = new DocumentBuilder()
        .setTitle('Campus Rate API')
        .setDescription(
          "API REST de gestion d'appréciation pour des endroits ou services du campus.",
        )
        .setVersion('1.0.0')
        .addTag('Places', 'Gestion des endroits ou services du campus')
        .addTag('Appreciationss', "Gestion d'appréciation ")
        .build();

      const documentFactory = () =>
        SwaggerModule.createDocument(app, config);

      SwaggerModule.setup('docs', app, documentFactory, {
        jsonDocumentUrl: 'docs/openapi.json',
        customSiteTitle: 'Campus Rate - Documentation',
      });
    }