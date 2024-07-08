import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaResolver } from './reserva.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { PdfGeneratorService } from '../pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva]),
  ],
  providers: [ReservaResolver, ReservaService, PdfGeneratorService],
})
export class ReservaModule {}