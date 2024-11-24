import { HttpException, Injectable,NotFoundException,UnauthorizedException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';   
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private usersService: UserService,private jwtService: JwtService
  ) {}

  async save_new(createUserDto: CreateUserDto){
    await this.usersService.create(createUserDto);
  }

  async login_handle(email:string,password:string): Promise<{ access_token: string }>{

    const user= await this.usersService.finduser(email);
    if (!user) {
      throw new NotFoundException();
    }
  
     const isMatch = await bcrypt.compare(password, user.password);
  
     if (!isMatch) {
      throw new UnauthorizedException();  
    }
    const payload = { sub: user._id, username: user.email };

    return { 
       
      access_token: await this.jwtService.signAsync(payload),

    };
   }

   

}
