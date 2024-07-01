import { Test, TestingModule } from '@nestjs/testing';
import { CarlosService } from './carlos.service';

describe('CarlosService', () => {
  let service: CarlosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarlosService],
    }).compile();

    service = module.get<CarlosService>(CarlosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
