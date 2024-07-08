import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { PrestamoResolver } from 'src/graphql/prestamo/prestamo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestamo } from './entities/prestamo.entity';
import { PdfGeneratorService } from '../pdf.service';

@Module({
imports: [
TypeOrmModule.forFeature([Prestamo]),
],

  providers: [PrestamoResolver, PrestamoService, PdfGeneratorService],
})
export class PrestamoModule {}
