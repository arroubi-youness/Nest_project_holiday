import { Injectable } from '@nestjs/common';
import { CreateAnnualVacationDto } from './dto/create-annual_vacation.dto';
import { UpdateAnnualVacationDto } from './dto/update-annual_vacation.dto';
import { Annual_vacation } from '../schemas/annual_vacation.schema';
import {UserService} from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
 
  
import {  Types } from "mongoose";

import { generatePDF, sendEmailWithPDF } from '../email_and_pdf_functions/f'
import * as fs from 'fs';
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

  async findById(userId: Types.ObjectId): Promise<any> {
      return await this.Annual_vacation_Model.find({"User_id_ref":userId});
  } 
  
  async update() {
    const table_conge: any[] = [];
    const created_annual_vacation = await this.Annual_vacation_Model.find({ demande_Status: "Pending" });
  
    for (const element of created_annual_vacation) {
      const user = await this.user.findOneById(element.User_id_ref);
  
      if (!user) {
        throw new Error('Utilisateur introuvable');
      }

      const id_demande=element._id;
      const Start_date = element.Start_date;
      const End_date = element.End_date;
      const id_user = element.User_id_ref;
      const Name = user.name;
      const familyName = user.familyName;
      const position = user.position;
      const Remainain_day = element.Remainain_day;
      const Jour_number = Math.ceil((Number(End_date) - Number(Start_date)) / (1000 * 60 * 60 * 24));
  
      const resultObject = {
        id_demande,
        id_user,
        Start_date,
        End_date,
        Name,
        familyName,
        position,
        Remainain_day,
        Jour_number,
      };
  
      table_conge.push(resultObject);
    }
  
    return { "voila les demande": table_conge };
  }
  
  async demendestauts(id: string, status: 'accepté' | 'refusé'| 'encours'){
    try {
    const demande = await this.Annual_vacation_Model.findById(id);
    if (!demande) {
      throw new Error('Demande introuvable');
    }
    demande.demande_Status = status;
    const daysDiff = Math.ceil((Number(demande.End_date) - Number(demande.Start_date)) / (1000 * 60 * 60 * 24));
    const NB =demande.Remainain_day- daysDiff; 
    if(NB<=0){
      const user = await this.user.findOneById(demande.User_id_ref);
        if (!user) {
          throw new Error('Utilisateur introuvable');
        }
 
         const pdfPath = await generatePDF(demande, user.name,user.familyName,0);
        await sendEmailWithPDF(user.email, pdfPath);
  
        fs.unlinkSync(pdfPath);
        return {
          message: `les jours insuffisants`,
        };
    }else{
       if (status === 'accepté') { 
        demande.Remainain_day=NB;
        await demande.save();
        const user = await this.user.findOneById(demande.User_id_ref);
        if (!user) {
          throw new Error('Utilisateur introuvable');
        }
 
         const pdfPath = await generatePDF(demande, user.name,user.familyName,1);
        await sendEmailWithPDF(user.email, pdfPath);
  
        fs.unlinkSync(pdfPath);
      }
      else if(status === 'refusé'){
        await demande.save();
        const user = await this.user.findOneById(demande.User_id_ref);
        if (!user) {
          throw new Error('Utilisateur introuvable');
        }
 
         const pdfPath = await generatePDF(demande, user.name,user.familyName,3);
        await sendEmailWithPDF(user.email, pdfPath);
  
        fs.unlinkSync(pdfPath);
      }
      else if(status === 'encours'){
        await demande.save();
        const user = await this.user.findOneById(demande.User_id_ref);
        if (!user) {
          throw new Error('Utilisateur introuvable');
        }
 
         const pdfPath = await generatePDF(demande, user.name,user.familyName,4);
        await sendEmailWithPDF(user.email, pdfPath);
  
        fs.unlinkSync(pdfPath);
      }
    return {
      message: `Le statut de la demande mis a jour`,
    };
  }
    } catch (error) {
    console.error(error);
  }
  }


  remove(id: number) {
    return `This action removes a #${id} annualVacation`;
  }
}
