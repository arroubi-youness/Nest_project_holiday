import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";
import { User } from './user.schema';
import moment from 'moment';

export type TrackSchema = HydratedDocument<Maladie_vacation>;

@Schema()
export class Maladie_vacation extends Document{
    @Prop({ 
        type: Types.ObjectId,  
        ref: 'User', 
        required: true 
      })
      User_id_ref!: Types.ObjectId;
      @Prop()
      Certificate_medical!: Buffer;

      @Prop({
        type: Date,
        get: (value: string) => new Date(value),
        set: (value: string) => moment(value, 'MM/DD/YYYY').toDate().toISOString(),
      })
      Start_date!: Date;
      @Prop({
        type: Date,
        get: (value: string) => new Date(value),
        set: (value: string) => moment(value, 'MM/DD/YYYY').toDate().toISOString(),
      })
      End_date!: Date;

      

}
const Annual_vacation_Schema = SchemaFactory.createForClass(Maladie_vacation);
export {Annual_vacation_Schema};


