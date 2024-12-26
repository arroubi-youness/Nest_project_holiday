import { Injectable } from '@nestjs/common';
import { CreateAnnualVacationDto } from './dto/create-annual_vacation.dto';
import { UpdateAnnualVacationDto } from './dto/update-annual_vacation.dto';
import { Annual_vacation } from '../schemas/annual_vacation.schema';
import {UserService} from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AnnualVacationService {
  constructor(
    @InjectModel(Annual_vacation.name)
    private Annual_vacation_Model: Model<Annual_vacation>,private user:UserService
  ) {}
  async create(createAnnualVacationDto: CreateAnnualVacationDto):Promise<any>{
    try {
      const created_annual_vacation = new this.Annual_vacation_Model(createAnnualVacationDto);
      const savedTracking = await created_annual_vacation.save();
    }catch(error){
        console.error(error);
    }
    return 'demande sent succsefuly';
  }

  findAll() {
    return `This action returns all annualVacation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} annualVacation`;
  }

  update(id: number, updateAnnualVacationDto: UpdateAnnualVacationDto) {
    return `This action updates a #${id} annualVacation`;
  }

  remove(id: number) {
    return `This action removes a #${id} annualVacation`;
  }
}
