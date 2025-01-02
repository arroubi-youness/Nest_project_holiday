import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateMaladieVacationDto } from './dto/create-maladie_vacation.dto';
 import { Maladie_vacation } from '../schemas/maladie.schema';
import {UserService} from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { generatePDF, sendEmailWithPDF } from '../email_and_pdf_functions/f'
import * as fs from 'fs';
@Injectable()
export class MaladieVacationService {
  constructor(
      @InjectModel(Maladie_vacation.name)
      private maladie_vacation_Model: Model<Maladie_vacation>,
      private user:UserService
    ) {}
 async create(createMaladieVacationDto: CreateMaladieVacationDto):Promise<any>{
  try {
    const create_maladie_vacation = new this.maladie_vacation_Model(createMaladieVacationDto);
    const savedTracking = await create_maladie_vacation.save();
    return { message: 'Maladie vacation demande successfully created', data: savedTracking };
  }catch(error){
      console.error(error);
      throw new Error('Error creating maladie vacation');

  }
    
  }
  async findById(userId: Types.ObjectId): Promise<any> {
    return await this.maladie_vacation_Model.find({"User_id_ref":userId});
  }
  async findAll():Promise<any>{
  try{
    const demandes = await this.maladie_vacation_Model.find({ demande_Status: 'Pending' });

     if (demandes.length === 0) {
      throw new HttpException(
        'No pending demands found.',
        HttpStatus.NOT_FOUND,
      );
    }

     return {
      message: 'Pending demands fetched successfully.',
      data: demandes,
    };  }catch(error){
     throw new Error('Error during getting all  demands');
  }
  }


  async getPDF(_id:Types.ObjectId ): Promise<any> {
    try {
       const document = await this.maladie_vacation_Model.findById({_id});
       console.log(document);

      if (!document) {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }

       return document.Certificate_medical;
    } catch (error:unknown) {
      if(error instanceof Error){
      throw new HttpException(
        error.message || 'Error retrieving PDF from database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    }
  }
 
  async demendestauts(id: string, status: 'accepté' | 'refusé'){
    try {
    const demande = await this.maladie_vacation_Model.findById(id);
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
 
         const pdfPath = await generatePDF(demande, user.name,user.familyName,2);
        await sendEmailWithPDF(user.email, pdfPath);
  
        fs.unlinkSync(pdfPath);
      }

    return {
      message: `Le statut de la demande mise a jour`,
    };
    
    } catch (error) {
    console.error(error);
  }
  }


  findOne(id: number) {
    return `This action returns a #${id} maladieVacation`;
  }

   

  remove(id: number) {
    return `This action removes a #${id} maladieVacation`;
  }
}
