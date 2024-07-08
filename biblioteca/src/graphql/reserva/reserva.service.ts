import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Reserva  } from 'src/graphql/reserva/entities/reserva.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ReservaService {

  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

  ) {}

  async findAll(): Promise< Reserva[]> {
    return this.reservaRepository.find();
  }

  async findOne(id: number): Promise<Reserva> {
    return this.reservaRepository.findOneBy({id: id});
  }
}
