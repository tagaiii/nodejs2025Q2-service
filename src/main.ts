import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);
  const configService = app.get(ConfigService);

  app.useGlobalGuards(new AuthGuard(jwtService, configService, reflector));

  app.enableCors();
  const dataSource = app.get(DataSource);
  await dataSource.runMigrations();

  const port = configService.get<number>('PORT') || 4000;

  await app.listen(port);
  console.log(`Server is running on ${port} port`);
}
bootstrap();
