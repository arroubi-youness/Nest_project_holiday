import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {DatabaseModule} from '../database/databse.module';
import {userProvides} from '../user/user.providers';



@Module({
  imports:[DatabaseModule,],
  controllers: [UserController],
  providers: [UserService,...userProvides],
  exports: [UserService], 
})
export class UserModule {}
