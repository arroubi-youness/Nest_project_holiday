import { Module,forwardRef  } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {User,UserSchema } from '../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import {RolesGuard} from '../roles/roles.guard';
 import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule,MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService,
     
  ],
  exports: [UserService], 
})
export class UserModule {}
 