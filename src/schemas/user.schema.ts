 
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { HydratedDocument } from 'mongoose';

export type Userdocument = HydratedDocument<User>;


@Schema()
export class User extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  familyName!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop()
  position!: string;

  @Prop()
  salaire!: string;

  @Prop({ required: true })
  password!: string;

  @Prop()
  age!: number;

  @Prop()
  refreshToken?: string;
}

 export const UserSchema = SchemaFactory.createForClass(User);

 
 UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();   
  const salt = await bcrypt.genSalt(10);             
  if (typeof this.password === 'string') {   
    this.password = await bcrypt.hash(this.password, salt);  
  } else {
    return next(new Error('Password must be a string'));
  }     
  return next();
});
