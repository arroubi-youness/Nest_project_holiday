import { Injectable } from '@nestjs/common';
import { CreateAnnualVacationDto } from './dto/create-annual_vacation.dto';
import { UpdateAnnualVacationDto } from './dto/update-annual_vacation.dto';
import { Annual_vacation_Schema, Annual_vacation } from '../schemas/annual_vacation.schema';
import {UserService} from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { generatePDF, sendEmailWithPDF } from '../tesgt/f'
import * as fs from 'fs';

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

 async  update()  {
    const created_annual_vacation =  await this.Annual_vacation_Model.find({demande_Status:"Pending"});
     return created_annual_vacation;
  }
  async demendestauts(id: string, status: 'accepté' | 'refusé'){
    try {
    const demande = await this.Annual_vacation_Model.findById(id);
    if (!demande) {
      throw new Error('Demande introuvable');
    }
    demande.demande_Status = status;
       await demande.save();
       if (status === 'accepté') {
        const user = await this.user.findOneById(demande.User_id_ref);
        if (!user) {
          throw new Error('Utilisateur introuvable');
        }
 
         const pdfPath = await generatePDF(demande, user.name,user.familyName);

        await sendEmailWithPDF(user.email, pdfPath);
  
        fs.unlinkSync(pdfPath);
      }
  
    return {
      message: `Le statut de la demande mis a jour`,
    };
    
    } catch (error) {
    console.error(error);
  }

  }

  remove(id: number) {
    return `This action removes a #${id} annualVacation`;
  }
}
