import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";
 import moment from 'moment';

export type Annual_vacation_Schema = HydratedDocument<Annual_vacation>;

@Schema()
export class Annual_vacation extends Document{
    @Prop({ 
        type: Types.ObjectId,
        ref: 'User', 
        required: true 
      })
      User_id_ref!: Types.ObjectId;
      @Prop()
      demande_Status!: string;

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


      @Prop()
      Remainain_day!:number;

}
const Annual_vacation_Schema = SchemaFactory.createForClass(Annual_vacation);

Annual_vacation_Schema.pre('save',async function(next){

  this.User_id_ref=new Types.ObjectId(this.User_id_ref);
 
  
  
 return next();
 
});

export {Annual_vacation_Schema};


