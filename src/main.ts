import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Veri doğrulama için (Ödev gereksinimi olan kayıt/giriş için önemli)
  app.useGlobalPipes(new ValidationPipe());

  // GÜNCELLEME: CORS ayarını herkesi kapsayacak şekilde basitleştirdik
  // Böylece hem senin bilgisayarından hem de buluttan erişilebilir
  app.enableCors(); 

  // GÜNCELLEME: Portu dinamik yaptık
  const port = process.env.PORT || 3000;
  
  await app.listen(port);
  console.log(`Backend ${port} portunda yayında!`);
}
bootstrap();