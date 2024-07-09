import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
import { PdfGeneratorService } from '../pdf.service';
@Resolver(() => Usuario)
export class UsuarioResolver {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Usuario], { name: 'Usuario' })
  findAll() {
    return this.usuarioService.findAll();
  }

  @Query(() => Usuario, { name: 'Usuarios' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usuarioService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdfUsuario' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('UsuarioId', { nullable: true, type: () => Int }) UsuarioId?: number,
  ) {
    let data;

    if (UsuarioId) {
      const prestamo = await this.usuarioService.findOne(UsuarioId);
      if (!Usuario) {
        throw new Error(`No se encontró ningún préstamo con ID ${UsuarioId}`);
      }
      data = [Usuario]; // Generar PDF para un préstamo específico
    } else {
      data = await this.usuarioService.findAll(); // Generar PDF para todos los préstamos
    }

    try {
      const filePath = await this.pdfGeneratorService.generatePdf(data, consultaNombre);
      return filePath; // Devuelve la ruta del archivo PDF generado
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      throw new Error('Error al generar el PDF. Por favor, inténtalo de nuevo más tarde.');
    }
  }
}