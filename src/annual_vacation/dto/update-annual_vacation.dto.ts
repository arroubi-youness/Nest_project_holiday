import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnualVacationDto } from './create-annual_vacation.dto';

export class UpdateAnnualVacationDto extends PartialType(CreateAnnualVacationDto) {}
