import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioResolver } from './usuario.resolver';
import { PdfGeneratorService } from '../pdf.service';
import { Usuario } from './entities/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
  ],
  providers: [UsuarioResolver, UsuarioService, PdfGeneratorService],
})
export class UsuarioModule {}
