import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AutorService {

  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,

  ) {}

  async findAll(): Promise<Autor[]> {
    return this.autorRepository.find();
  }

  async findOne(id: number): Promise<Autor> {
    return this.autorRepository.findOneBy({id: id});
  }
}
