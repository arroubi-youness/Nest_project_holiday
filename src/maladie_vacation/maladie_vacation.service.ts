import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateMaladieVacationDto } from './dto/create-maladie_vacation.dto';
import { UpdateMaladieVacationDto } from './dto/update-maladie_vacation.dto';
import { Maladie_vacation } from '../schemas/maladie.schema';
import {UserService} from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
 
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
