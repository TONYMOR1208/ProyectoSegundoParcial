import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Sancion } from './entities/sancion.entity';
import { PdfGeneratorService } from '../pdf.service';
//import { Sancion } from '../sancion/entities/sancion.entity';
import { SancionService } from './sancion.service';

@Resolver(() => Sancion)
export class SancionResolver {
  constructor(
    private readonly sancionService: SancionService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Sancion], { name: 'Sancion' })
  findAll() {
    return this.sancionService.findAll();
  }

  @Query(() => Sancion, { name: 'Sanciones' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sancionService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdfSancion' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('sancionId', { nullable: true, type: () => Int }) sancionId?: number,
  ) {
    let data;

    if (sancionId) {
      const prestamo = await this.sancionService.findOne(sancionId);
      if (!Sancion) {
        throw new Error(`No se encontró ningún préstamo con ID ${sancionId}`);
      }
      data = [Sancion]; // Generar PDF para un préstamo específico
    } else {
      data = await this.sancionService.findAll(); // Generar PDF para todos los préstamos
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