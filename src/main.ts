import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as express from 'express'
import { join } from 'path'

async function boot (): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(express.json({ limit: '20mb' }))

  app.useGlobalPipes(new ValidationPipe({
    always: true,
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true,
    forbidUnknownValues: true
  }))

  app.useStaticAssets(join(__dirname, '..', 'public'))

  void app.listen(3000)
}

void boot()
