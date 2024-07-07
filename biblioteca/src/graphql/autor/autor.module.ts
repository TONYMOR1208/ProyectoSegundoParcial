import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorResolver } from './autor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Autor } from './entities/autor.entity';
import { PdfGeneratorService } from '../pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Autor]),
  ],
  providers: [AutorResolver, AutorService, PdfGeneratorService],
})
export class AutorModule {}
