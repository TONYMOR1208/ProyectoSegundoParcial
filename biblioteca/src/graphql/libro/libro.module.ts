import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroResolver } from './libro.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { PdfGeneratorService } from '../pdf.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Libro]),
  ],
  providers: [LibroResolver, LibroService,PdfGeneratorService],
})
export class LibroModule {}
