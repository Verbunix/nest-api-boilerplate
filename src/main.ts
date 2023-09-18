import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*' },
    rawBody: true,
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  // SWAGGER
  if (process.env.SWAGGER === 'true') {
    const swaggerConfig = new DocumentBuilder().addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    const swaggerOptions = <SwaggerCustomOptions>{
      swaggerOptions: { persistAuthorization: true },
    };
    SwaggerModule.setup('swagger', app, document, swaggerOptions);
  }

  await app.listen(3000);
}

bootstrap();
