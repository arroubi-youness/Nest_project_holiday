import { Injectable } from '@nestjs/common';
import { CreateMaladieVacationDto } from './dto/create-maladie_vacation.dto';
import { UpdateMaladieVacationDto } from './dto/update-maladie_vacation.dto';

@Injectable()
export class MaladieVacationService {
  create(createMaladieVacationDto: CreateMaladieVacationDto) {
    return 'This action adds a new maladieVacation';
  }

  findAll() {
    return `This action returns all maladieVacation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} maladieVacation`;
  }

  update(id: number, updateMaladieVacationDto: UpdateMaladieVacationDto) {
    return `This action updates a #${id} maladieVacation`;
  }

  remove(id: number) {
    return `This action removes a #${id} maladieVacation`;
  }
}
