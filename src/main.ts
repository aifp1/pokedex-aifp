import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //De esta forma el url saldra con api/pokemon...
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      //Ojo que esta opcion puede consumir mas memoria
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  )

  await app.listen(process.env.PORT, () =>{
    console.log(`App running on port ${process.env.PORT}`);
  });
}
bootstrap();
