import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
 import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.save_new(createUserDto);
      return { message: 'User successfully created' };
    } catch (error) {
       if ((error as any).code === 11000) {  
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'User with this email already exists',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error  during  the register  of  the  user',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
