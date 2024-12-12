import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaladieVacationService } from './maladie_vacation.service';
import { CreateMaladieVacationDto } from './dto/create-maladie_vacation.dto';
import { UpdateMaladieVacationDto } from './dto/update-maladie_vacation.dto';

@Controller('maladie-vacation')
export class MaladieVacationController {
  constructor(private readonly maladieVacationService: MaladieVacationService) {}

  @Post()
  create(@Body() createMaladieVacationDto: CreateMaladieVacationDto) {
    return this.maladieVacationService.create(createMaladieVacationDto);
  }

  @Get()
  findAll() {
    return this.maladieVacationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.maladieVacationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaladieVacationDto: UpdateMaladieVacationDto) {
    return this.maladieVacationService.update(+id, updateMaladieVacationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.maladieVacationService.remove(+id);
  }
}
