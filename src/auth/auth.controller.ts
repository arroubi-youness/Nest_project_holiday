import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  UseGuards,
  HttpCode,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import { Response } from 'express'; 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
       await this.authService.save_new(createUserDto);
      return { message: 'User successfully created' };
    } catch (error:any) {
      console.log(error)
      if (error.message && error.message.includes('E11000')) {
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
  async login(@Body() a: CreateUserDto,@Res({ passthrough: true }) response: Response) {
    const result= this.authService.login_handle(a.email, a.password);
    console.log((await result).identity);
    response.cookie('id', (await result).identity.toString(), {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const acceses_token=(await result).access_token
     return{
      acces_token:acceses_token,
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
