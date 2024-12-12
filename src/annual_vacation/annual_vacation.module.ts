import { Module } from '@nestjs/common';
import { AnnualVacationService } from './annual_vacation.service';
import { AnnualVacationController } from './annual_vacation.controller';
import {UserModule} from '../user/user.module';
import {Annual_vacation_Schema,Annual_vacation} from '../schemas/annual_vacation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[UserModule,MongooseModule.forFeature([{name:Annual_vacation.name, schema:Annual_vacation_Schema}])],
  controllers: [AnnualVacationController],
  providers: [AnnualVacationService],
})
export class AnnualVacationModule {}
