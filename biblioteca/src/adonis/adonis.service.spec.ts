import { Test, TestingModule } from '@nestjs/testing';
import { AdonisService } from './adonis.service';

describe('AdonisService', () => {
  let service: AdonisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdonisService],
    }).compile();

    service = module.get<AdonisService>(AdonisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
