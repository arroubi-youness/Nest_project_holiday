import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TrackingModule } from './tracking/tracking.module';
import { QrcodeModule } from './qrcode/qrcode.module';
 import { MaladieVacationModule } from './maladie_vacation/maladie_vacation.module';
import { AnnualVacationModule } from './annual_vacation/annual_vacation.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TrackingModule,
    QrcodeModule,
    MaladieVacationModule,
    AnnualVacationModule,
  ],
})
export class AppModule {}
