import { Module } from '@nestjs/common';
import { DevolucionService } from './devolucion.service';
import { DevolucionResolver } from './devolucion.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devolucion } from './entities/devolucion.entity';
import { PdfGeneratorService } from '../pdf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Devolucion]),
  ],
  providers: [DevolucionResolver, DevolucionService, PdfGeneratorService],
})
export class DevolucionModule {}

