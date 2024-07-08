import { Module } from '@nestjs/common';
import { SancionService } from './sancion.service';
import { SancionResolver } from './sancion.resolver';
import { PdfGeneratorService } from '../pdf.service';
import { Sancion } from './entities/sancion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sancion]),
  ],
  providers: [SancionResolver, SancionService, PdfGeneratorService],
})
export class SancionModule {}
