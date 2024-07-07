import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneroService {

  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  
  ) {}

  async findAll(): Promise<Genero[]> {
    return this.generoRepository.find();
  }

  findOne(id: number): Promise<Genero> {
    return this.generoRepository.findOneBy({id: id});
  }

}
