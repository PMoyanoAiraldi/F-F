import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const swaggerConfig = new DocumentBuilder()
    .setTitle('F&F')
    .setDescription('Esta API permite la creación,  actualización y eliminación de productos hidraulicos, así como la gestión de usuarios y órdenes de compra. Ideal para desarrolladores que buscan integrar funcionalidades de comercio electrónico en sus aplicaciones.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
