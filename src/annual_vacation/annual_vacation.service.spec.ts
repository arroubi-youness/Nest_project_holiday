import { Test, TestingModule } from '@nestjs/testing';
import { AnnualVacationService } from './annual_vacation.service';

describe('AnnualVacationService', () => {
  let service: AnnualVacationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnualVacationService],
    }).compile();

    service = module.get<AnnualVacationService>(AnnualVacationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
