/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
// import { IoAdapter } from '@nestjs/platform-socket.io'
import { CustomSocketIoAdapter } from './socket-io.adapter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //Habilitando CORS
  app.enableCors({
    origin: '*'
  });

  //Habilita websocket
  app.useWebSocketAdapter(new CustomSocketIoAdapter(app))

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
