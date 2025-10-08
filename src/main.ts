import { useContainer } from 'class-validator';
import { ModuleRef, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Escolas Esportivas - SportHubAPI')
    .setDescription(
      'A presente API tem como objetivo simular cadastros possíveis para uma API de Escolas de Esportes',
    )
    .setVersion('1.0')
    .addTag('usuarios')
    .addTag('escola')
    .addTag('esporte')
    .addTag('eventos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

 
  useContainer(app.get(ModuleRef), { fallbackOnErrors: true });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
