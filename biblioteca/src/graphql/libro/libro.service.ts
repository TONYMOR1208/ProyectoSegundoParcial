import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';


@Injectable()
export class LibroService {

  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
  ) { }

  async findAll(): Promise<Libro[]> {
    return this.libroRepository.find();
  }

  async findOne(id: number) {
    return await this.libroRepository.findOne({ where: {id}});
  }

}
