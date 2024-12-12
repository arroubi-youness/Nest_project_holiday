import { Test, TestingModule } from '@nestjs/testing';
import { AnnualVacationController } from './annual_vacation.controller';
import { AnnualVacationService } from './annual_vacation.service';

describe('AnnualVacationController', () => {
  let controller: AnnualVacationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnualVacationController],
      providers: [AnnualVacationService],
    }).compile();

    controller = module.get<AnnualVacationController>(AnnualVacationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
