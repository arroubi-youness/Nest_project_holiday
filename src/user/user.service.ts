import { Injectable,Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userProvides } from './user.providers';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';



@Injectable()
export class UserService {

  constructor(
    @Inject('User_Model')
    private userModel: Model<User>,
  ) {}

 async create(createUserDto: CreateUserDto):Promise<User>  {
      
  const createdCat = new this.userModel(createUserDto);  
  return createdCat.save();
      

     
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
