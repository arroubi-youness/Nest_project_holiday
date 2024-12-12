import { Test, TestingModule } from '@nestjs/testing';
import { MaladieVacationService } from './maladie_vacation.service';

describe('MaladieVacationService', () => {
  let service: MaladieVacationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaladieVacationService],
    }).compile();

    service = module.get<MaladieVacationService>(MaladieVacationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
