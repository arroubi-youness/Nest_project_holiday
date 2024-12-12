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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.annualVacationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnnualVacationDto: UpdateAnnualVacationDto) {
    return this.annualVacationService.update(+id, updateAnnualVacationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.annualVacationService.remove(+id);
  }
}
