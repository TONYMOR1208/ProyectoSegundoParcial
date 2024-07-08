import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrestamoService {
  constructor(
    @InjectRepository(Prestamo)
    private readonly prestamoRepository: Repository<Prestamo>,
  ) {}

  async findAll(): Promise<Prestamo[]> {
    return this.prestamoRepository.find();
  }

  async findOne(id: number): Promise<Prestamo> {
    return this.prestamoRepository.findOneBy({ id: id });
  }
}
