import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DevolucionService } from './devolucion.service';
import { Devolucion } from './entities/devolucion.entity';
import { PdfGeneratorService } from '../pdf.service';



@Resolver(() => Devolucion)
export class DevolucionResolver {
  constructor(
    private readonly devolucionService: DevolucionService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Devolucion], { name: 'devoluciones' })
  findAll() {
    return this.devolucionService.findAll();
  }

  @Query(() => Devolucion, { name: 'devolucion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.devolucionService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdfDevoluciones' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('devolucionId', { nullable: true, type: () => Int }) devolucionId?: number,
  ) {
    let data;

    if (devolucionId) {
      const devolucion = await this.devolucionService.findOne(devolucionId);
      if (!devolucion) {
        throw new Error(`No se encontró ninguna devolución con ID ${devolucionId}`);
      }
      data = [devolucion]; // Generar PDF para una devolución específica
    } else {
      data = await this.devolucionService.findAll(); // Generar PDF para todas las devoluciones
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
