import { Module } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Track ,TrackSchema} from '../schemas/tracking.schema';
import {UserModule} from '../user/user.module';
import {MaladieVacationModule} from '../maladie_vacation/maladie_vacation.module';
import {AnnualVacationModule} from '../annual_vacation/annual_vacation.module';

@Module({
  imports:[UserModule,MaladieVacationModule,AnnualVacationModule
    ,MongooseModule.forFeature([{name:Track.name, schema:TrackSchema}])],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
