import { Module } from '@nestjs/common';
import { GeneroService } from './genero.service';
import { GeneroResolver } from './genero.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';
import { PdfGeneratorService } from '../pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Genero]),
  ],
  providers: [GeneroResolver, GeneroService, PdfGeneratorService],
})
export class GeneroModule {}
