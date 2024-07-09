import { Module } from '@nestjs/common';
import { SancionService } from './sancion.service';
import { SancionResolver } from './sancion.resolver';
import { PdfGeneratorService } from '../pdf.service';
import { Sancion } from './entities/sancion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resena } from '../resena/entities/resena.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sancion, Resena]),
  ],
  providers: [SancionResolver, SancionService, PdfGeneratorService],
  exports: [SancionService]
})
export class SancionModule {}
