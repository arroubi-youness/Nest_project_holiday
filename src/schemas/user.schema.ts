import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const userScehma = new mongoose.Schema({
  name: String,
  familyName:String,
  email: {
    type: String,
    required: true,
    unique: true  
},
  position:String,
  salaire:String,
  password:String,
  age: Number,
  refreshToken: {
    type: String,  
  }
 });
 userScehma.pre('save', async function (next) {
  if (!this.isModified('password')) return next();   
  const salt = await bcrypt.genSalt(10);             
  if (typeof this.password === 'string') {   
    this.password = await bcrypt.hash(this.password, salt);  
  } else {
    return next(new Error('Password must be a string'));
  }     
  return next();
});

 export interface User extends mongoose.Document {
  name: string;
  familyName: string;
  email: string;
  position?: string;
  salaire?: string;
  password: string;
  age: number;
  refreshToken?: string;   
}
