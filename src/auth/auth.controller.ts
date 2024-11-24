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
  UseGuards,
  HttpCode,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import {AuthGuard} from './auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @UsePipes(ValidationPipe)
    async register(@Body() createUserDto: CreateUserDto) {
    try {
      await this.authService.save_new(createUserDto);
      return { "message": 'User successfully created' };
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
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() a:CreateUserDto){
    
    return this.authService.login_handle(a.email,a.password);
 
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req:any) {
    return req.user;
  }

}
