import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SancionService } from './sancion.service';
import { Sancion } from './entities/sancion.entity';
import { ResenaService } from '../resena/resena.service';
import { PdfGeneratorService } from '../pdf.service';
import { Resena } from '../resena/entities/resena.entity';

@Resolver(() => Sancion)
export class SancionResolver {
  constructor(
    private readonly resenaService: ResenaService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Resena], { name: 'Resena' })
  findAll() {
    return this.resenaService.findAll();
  }

  @Query(() => Resena, { name: 'Resena' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.resenaService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdfPrestamos' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('ResenaId', { nullable: true, type: () => Int }) ResenaId?: number,
  ) {
    let data;

    if (ResenaId) {
      const prestamo = await this.resenaService.findOne(ResenaId);
      if (!Resena) {
        throw new Error(`No se encontró ningún préstamo con ID ${ResenaId}`);
      }
      data = [prestamo]; // Generar PDF para un préstamo específico
    } else {
      data = await this.resenaService.findAll(); // Generar PDF para todos los préstamos
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