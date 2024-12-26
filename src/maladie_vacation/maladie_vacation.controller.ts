import {
  Controller,
  UsePipes,
  ValidationPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFile,
  UseInterceptors,
  Get,
  Post,
  Body,
  Patch,
  Param,Res,
  Delete,
  Type,
} from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';

import { MaladieVacationService } from './maladie_vacation.service';
import { CreateMaladieVacationDto } from './dto/create-maladie_vacation.dto';
import { UpdateMaladieVacationDto } from './dto/update-maladie_vacation.dto';
 import { FileInterceptor } from '@nestjs/platform-express';

@Controller('maladie_vacation')
export class MaladieVacationController {
  constructor(
    private readonly maladieVacationService: MaladieVacationService,
  ) {}

  @Post('demandeMaladie')
  @UsePipes(ValidationPipe)
   @UseInterceptors(FileInterceptor('Certificate_medical'))
  async create_demande(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'application/pdf' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createMaladieVacationDto: CreateMaladieVacationDto,
  ) {
    console.log(createMaladieVacationDto);
    try {
      const newMaladieVacation = {
        User_id_ref: createMaladieVacationDto.User_id_ref,
        Certificate_medical: file.buffer,
        demande_Status:createMaladieVacationDto.demande_Status,
        Start_date: createMaladieVacationDto.Start_date,
        End_date: createMaladieVacationDto.End_date,
      };
      return await this.maladieVacationService.create(newMaladieVacation);
    } catch (error) {
      throw new Error('Error creating maladie vacation');
    }
  }

  @Get('get_all')
  async findAll():Promise<any>{
    const a= await  this.maladieVacationService.findAll();
    console.log(a);
    return a;
  }

  @Get('download/:id')
  async downloadPDF(@Param('id') id: Types.ObjectId, @Res() res: Response) {
    try {
       const pdfBuffer = await this.maladieVacationService.getPDF(id);

       res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificate_medical_${id}.pdf"`,
        'Content-Length': pdfBuffer.length,
      });

       return res.send(pdfBuffer);
    } catch (error:unknown) {
      if(error instanceof  Error){
      res.status(500).json({
        message:'Error sending the PDF file',
      });
    }}
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.maladieVacationService.findOne(+id);
  // }

  @Patch('update-status-maladie/:id')
  async updateStatus( @Param('id') id: string,@Body('status') status: 'accepté' | 'refusé',) {
    return await this.maladieVacationService.demendestauts(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maladieVacationService.remove(+id);
  }
}
