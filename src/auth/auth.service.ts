import { Injectable } from '@nestjs/common';
 
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';   


@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async save_new(createUserDto: CreateUserDto){
    await this.usersService.create(createUserDto);
  }

}
