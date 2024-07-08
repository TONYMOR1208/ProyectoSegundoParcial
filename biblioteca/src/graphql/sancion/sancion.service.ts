import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Resena } from '../resena/entities/resena.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SancionService {
  constructor(
    @InjectRepository(Resena)
    private readonly ResenaRepository: Repository<Resena>,
  ) {}

  async findAll(): Promise<Resena[]> {
    return this.ResenaRepository.find();
  }

  async findOne(id: number): Promise<Resena> {
    return this.ResenaRepository.findOneBy({ id: id });
  }
}