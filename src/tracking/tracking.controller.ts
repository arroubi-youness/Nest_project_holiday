import {
  Controller,
  Get,
  UseInterceptors,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Res,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { Response } from 'express';
import { Types } from 'mongoose';
import { ToObjectIdInterceptor } from './tracking.interceptor';
import { MaladieVacationService } from '../maladie_vacation/maladie_vacation.service';
import { AnnualVacationService } from '../annual_vacation/annual_vacation.service';
 
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService,private maladie:MaladieVacationService,private conge:AnnualVacationService) {}

  @Post('check_in')
  async create(
    @Body() createTrackingDto: CreateTrackingDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const result = await this.trackingService.create(createTrackingDto);
      res.cookie('id_track', (await result).id.toString(), {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return { message: (await result).message };
    } catch (error: any) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error  during  the register  of  the  TRACK',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseInterceptors(ToObjectIdInterceptor)
  @Patch('checkout/:id')
  update(@Param('id') id: Types.ObjectId, @Query('date_out') date_out: Date) {
    return this.trackingService.update(id, date_out);
  }

  @Get('check_abscent')
  async abscent() {
    try {
      const this_day_time = new Date();
      const this_day_number = this_day_time.getDate();
      const this_day_month = this_day_time.getMonth();
      

      const all_user = await this.trackingService.check_abscence();

      const presence_user = await this.trackingService.findAll();
      const id: Types.ObjectId[] = [];
      presence_user.map((element) => {
        if (
          element.check_in_date.getDate() == this_day_number &&
          element.check_in_date.getMonth() == this_day_month
        ) {
          id.push(element.User_id_ref);
        }
      });
      const abscent_id: Types.ObjectId[] = [];
      all_user.map((element) => {
        if (element._id instanceof Types.ObjectId) {
          let a = element._id.toString();
          if (!id.toString().includes(a)) {
            abscent_id.push(element._id as Types.ObjectId);
          }

        }
        
      }
    );

      const day_abscent = new Date();
      abscent_id.map(async (element) => {
        const annual_vacation = await this.conge.findById(element);
        const maladie_vacation = await this.maladie.findById(element);
      
        let iskayn = false;
        for (const ele of annual_vacation) {
          if (ele.Start_date <= day_abscent && ele.End_date >= day_abscent && ele.demande_Status === "accepté") {
            let new_absennt_track = {
              User_id_ref: element,
              check_in_date: undefined,
              check_out_date: undefined,
              abscent_date: day_abscent,
              Status: 'abscent',
              abscent_status: 'justfiy_conge',
            };
            await this.trackingService.save_abscent_track(new_absennt_track);
            iskayn = true;
            break;
          }
        }
      
        if (!iskayn) {
          for (const ele of maladie_vacation) {
            if (ele.Start_date <= day_abscent && ele.End_date >= day_abscent && ele.demande_Status === "accepté") {
              let new_absennt_track = {
                User_id_ref: element,
                check_in_date: undefined,
                check_out_date: undefined,
                abscent_date: day_abscent,
                Status: 'abscent',
                abscent_status: 'justfiy_maladie',
              };
              await this.trackingService.save_abscent_track(new_absennt_track);
              iskayn = true;
              break;
            }
          }
        }
      
        if (!iskayn) {
          let new_absennt_track = {
            User_id_ref: element,
            check_in_date: undefined,
            check_out_date: undefined,
            abscent_date: day_abscent,
            Status: 'abscent',
            abscent_status: 'Non_justfiy',
          };
          await this.trackingService.save_abscent_track(new_absennt_track);
        }
      });
      
     } catch (error) {
      console.error(error); 
    } 
      
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackingService.remove(+id);
  }
}
