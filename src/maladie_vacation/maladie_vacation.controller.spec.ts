import { Test, TestingModule } from '@nestjs/testing';
import { MaladieVacationController } from './maladie_vacation.controller';
import { MaladieVacationService } from './maladie_vacation.service';

describe('MaladieVacationController', () => {
  let controller: MaladieVacationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaladieVacationController],
      providers: [MaladieVacationService],
    }).compile();

    controller = module.get<MaladieVacationController>(MaladieVacationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
