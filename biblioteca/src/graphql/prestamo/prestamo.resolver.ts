import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrestamoService } from './prestamo.service';
import { Prestamo } from './entities/prestamo.entity';
import { PdfGeneratorService } from '../pdf.service';


@Resolver(() => Prestamo)
export class PrestamoResolver {
  constructor(
    private readonly prestamoService: PrestamoService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Prestamo], { name: 'prestamos' })
  findAll() {
    return this.prestamoService.findAll();
  }

  @Query(() => Prestamo, { name: 'prestamo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prestamoService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdfPrestamos' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('prestamoId', { nullable: true, type: () => Int }) prestamoId?: number,
  ) {
    let data;

    if (prestamoId) {
      const prestamo = await this.prestamoService.findOne(prestamoId);
      if (!prestamo) {
        throw new Error(`No se encontró ningún préstamo con ID ${prestamoId}`);
      }
      data = [prestamo]; // Generar PDF para un préstamo específico
    } else {
      data = await this.prestamoService.findAll(); // Generar PDF para todos los préstamos
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
