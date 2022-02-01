import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from './transform.interceptor'

const PORT = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(PORT, () => {
    console.log(`Server listening in port: ${PORT}! 🚀`)
  })
}
bootstrap()
