import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Types } from "mongoose";

export type TrackSchema = HydratedDocument<Track>;



@Schema()
export class Track extends Document {
    @Prop({ 
        type: Types.ObjectId,  
        ref: 'User', 
        required: true 
      })
      User_id_ref!: Types.ObjectId;

  @Prop()
  check_in_date!: Date;

  @Prop()
  check_out_date!: Date;

  @Prop()
  diffrence!:number;

  @Prop()
  Status!: string;

  @Prop()
  abscent_status?: string;
 

}
  const TrackSchema = SchemaFactory.createForClass(Track);

  TrackSchema.pre('save',async function(next){

       this.User_id_ref=new Types.ObjectId(this.User_id_ref);
      
      if(this.Status === 'present'){
          this.abscent_status=undefined;
      }
       
      return next();
      
  });



export {TrackSchema};

