import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    // .env dosyasını global olarak tanımlıyoruz
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // SQLite Yapılandırması
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // Proje ana dizininde bu isimde bir dosya oluşur
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Tüm entityleri otomatik bulur
      autoLoadEntities: true,
      synchronize: true, // Geliştirme aşamasında tabloları otomatik oluşturur
    }),

    UsersModule,
    AuthModule,
    StudentsModule,
    EnrollmentsModule,
    CoursesModule,
  ],
})
export class AppModule {}