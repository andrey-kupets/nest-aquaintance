import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as fs from 'fs';
import { join } from 'path';


import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDescription = fs.readFileSync(join(__dirname, '..', 'description.markdown'));
  const config = new DocumentBuilder()
    .setTitle('Nest for the first')
    .setDescription(swaggerDescription.toString())
    .setVersion('1.0')
    .addTag('nestFest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
