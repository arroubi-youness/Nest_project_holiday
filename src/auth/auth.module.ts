import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService,ConfigModule } from '@nestjs/config';
 
@Module({

  imports:[UserModule,ConfigModule, 
    JwtModule.registerAsync({   
      imports: [ConfigModule], 
      inject: [ConfigService],  
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('acces_token'),   
        signOptions: { expiresIn: '30s' },   
      }),
    }),
    ], 
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
  