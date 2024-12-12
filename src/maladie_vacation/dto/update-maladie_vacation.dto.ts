import { PartialType } from '@nestjs/mapped-types';
import { CreateMaladieVacationDto } from './create-maladie_vacation.dto';

export class UpdateMaladieVacationDto extends PartialType(CreateMaladieVacationDto) {}
