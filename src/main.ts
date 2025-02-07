import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { VALIDATION_PIPE_OPTIONS } from './common/pipes/validation.pipe';
import { ConfigService } from './config/config.service';

process.on('uncaughtException', (err, origin) => {
  console.log('uncaughtException', err, origin);
});

function withSwagger(app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle('Subscription API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true, filter: true },
  });
}

async function bootstrap() {
  const adapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  withSwagger(app);

  const config = app.get(ConfigService);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));

  const port = config.get('app.port');

  await app.listen(port, '0.0.0.0');
}
bootstrap();
