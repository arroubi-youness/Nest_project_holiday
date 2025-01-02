import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../roles/roles.guard';
import {AuthGuard} from '../auth/auth.guard';
 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Rh) 
  @UseGuards(AuthGuard,RolesGuard) 
  @Get("all")
  findAll_users() {
    return this.userService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.userService.findOne();
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
