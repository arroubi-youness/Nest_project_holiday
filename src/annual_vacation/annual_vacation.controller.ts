import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnnualVacationService } from './annual_vacation.service';
import { CreateAnnualVacationDto } from './dto/create-annual_vacation.dto';
import { UpdateAnnualVacationDto } from './dto/update-annual_vacation.dto';

@Controller('annual_vacation')
export class AnnualVacationController {
  constructor(private readonly annualVacationService: AnnualVacationService) {}

  @Post("annualVaction")
  create(@Body() createAnnualVacationDto: CreateAnnualVacationDto) {
    return this.annualVacationService.create(createAnnualVacationDto);
  }

  @Get()
  findAll() {
    return this.annualVacationService.findAll();
  } 

 

  @Get('jbed')
  update() {
    return this.annualVacationService.update();
  }

  @Patch('update-status/:id')
  async updateStatus( @Param('id') id: string,@Body('status') status: 'accepté' | 'refusé',) {
    return await this.annualVacationService.demendestauts(id, status);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.annualVacationService.remove(+id);
  }
}
