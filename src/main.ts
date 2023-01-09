import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function boot (): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('/api/v1')
  app.useGlobalPipes(new ValidationPipe({
    always: true,
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true,
    forbidUnknownValues: true
  }))

  void app.listen(3000)
}

void boot()
