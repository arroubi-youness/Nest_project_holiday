import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { Track } from '../schemas/tracking.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {UserService} from '../user/user.service';

 @Injectable()
export class TrackingService {
  constructor(
    @InjectModel(Track.name)
    private trackModel: Model<Track>,private user:UserService
  ) {}
  async create(createTrackingDto: CreateTrackingDto): Promise<any> {
    try {
      const createdTrack = new this.trackModel(createTrackingDto);
      const savedTracking = await createdTrack.save();

      const id_track = savedTracking._id;
      if (!(id_track instanceof Types.ObjectId)) {
        throw new InternalServerErrorException();
      }
      return {
        message: 'Track saved successfully',
        id: id_track.toString(),
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error creating user: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred');
      }
    }
  }
   async save_abscent_track(createTrackingDto: CreateTrackingDto):Promise<any>{
    try {
      const createdTrack_abscent = new this.trackModel(createTrackingDto);
      const savedTracking_saved = await createdTrack_abscent.save();}
      catch(error){

        console.error(error);

      }
   }
  findAll() {
    return this.trackModel.find({ Status: 'present' });
  }

  
  async update(trackingId: Types.ObjectId, date: Date) {
    const updatedTracking = await this.trackModel.findById(trackingId);
    await this.trackModel.findByIdAndUpdate(trackingId, {
      check_out_date: date,
    });
    const check_in = updatedTracking?.check_in_date;
    const check_out = updatedTracking?.check_out_date;
    if (!check_in || !check_out) {
      throw new Error();
    }
    const date1 = new Date(check_in);
    const date2 = new Date(check_out);

    const differenceInMilliseconds: number = date2.getTime() - date1.getTime();

    const deffrence = Math.floor(differenceInMilliseconds / 3600000) - 8;
    console.log(deffrence);
    const update_test = await this.trackModel.findByIdAndUpdate(
      trackingId,
      { diffrence: deffrence },
      { new: true },

    );
    if (!updatedTracking) {
      throw new Error('Tracking not found');
    }

    return update_test;
  }

    async check_abscence(){
      
          
        return this.user.findAll();
        
    }

  remove(id: number) {
    return `This action removes a #${id} tracking`;
  }
}
