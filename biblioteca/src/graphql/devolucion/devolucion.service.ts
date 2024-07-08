
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Devolucion } from './entities/devolucion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DevolucionService {
  constructor(
    @InjectRepository(Devolucion)
    private readonly devolucionRepository: Repository<Devolucion>,
  ) {}

  async findAll(): Promise<Devolucion[]> {
    return this.devolucionRepository.find();
  }

  async findOne(id: number): Promise<Devolucion> {
    return this.devolucionRepository.findOneBy({ id: id });
  }
}
