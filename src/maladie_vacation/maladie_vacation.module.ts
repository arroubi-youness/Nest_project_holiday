import { Module } from '@nestjs/common';
import { MaladieVacationService } from './maladie_vacation.service';
import { MaladieVacationController } from './maladie_vacation.controller';

@Module({
  controllers: [MaladieVacationController],
  providers: [MaladieVacationService],
})
export class MaladieVacationModule {}
