import { Injectable,Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
 import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
  


@Injectable()
export class UserService {

  constructor(
   
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

 async create(createUserDto: CreateUserDto):Promise<User>  {
       
  try {
    const createdUser = new this.userModel(createUserDto);
     return await createdUser.save();
  } catch (error:unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }  }

     
  }

  findAll() {
    return this.userModel.find();
  }

  async finduser(email: String) {
      return await this.userModel.findOne({ email }).exec();
      

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {

  }
}
