import { Module } from '@nestjs/common';
import { ResenaService } from './resena.service';
import { ResenaResolver } from './resena.resolver';
import { PdfGeneratorService } from '../pdf.service';
import {Resena} from './entities/resena.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([Resena]),
  ],
  providers: [ResenaResolver, ResenaService, PdfGeneratorService],
  exports: [ResenaService]
})
export class ResenaModule {}
