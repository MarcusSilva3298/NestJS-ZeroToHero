import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from './transform.interceptor'
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions
} from '@nestjs/swagger'

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule)

  // app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true
  }

  const config = new DocumentBuilder()
    .setTitle('Task Management')
    .setDescription('Task Management API documentation')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Tasks')
    .build()

  const document = SwaggerModule.createDocument(app, config, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT, () => {
    logger.log(`Server listening in port: ${process.env.PORT}! 🚀`)
  })
}
bootstrap()
