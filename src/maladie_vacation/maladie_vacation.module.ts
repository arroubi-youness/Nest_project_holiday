import { Module } from '@nestjs/common';
import { MaladieVacationService } from './maladie_vacation.service';
import { MaladieVacationController } from './maladie_vacation.controller';
import {UserModule} from '../user/user.module';
import {Maladie_vacation_Schema,Maladie_vacation} from '../schemas/maladie.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[UserModule,MongooseModule.forFeature([{name:Maladie_vacation.name, schema:Maladie_vacation_Schema}])],
  controllers: [MaladieVacationController],
  providers: [MaladieVacationService],
})
export class MaladieVacationModule {}
