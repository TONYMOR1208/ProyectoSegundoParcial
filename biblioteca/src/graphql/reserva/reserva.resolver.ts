import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservaService } from './reserva.service';
import { Reserva } from './entities/reserva.entity';
import { PdfGeneratorService } from '../pdf.service';



@Resolver(() => Reserva)
export class ReservaResolver {
  constructor(
    private readonly reservaService: ReservaService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Reserva], { name: 'reservas' })
  findAll() {
    return this.reservaService.findAll();
  }

  @Query(() => Reserva, { name: 'reserva' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reservaService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdfReservas' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('reservaId', { nullable: true, type: () => Int }) reservaId?: number,
  ) {
    let data;

    if (reservaId) {
      const reserva = await this.reservaService.findOne(reservaId);
      if (!reserva) {
        throw new Error(`No se encontró ninguna reserva con ID ${reservaId}`);
      }
      data = [reserva]; // Generar PDF para una reserva específica
    } else {
      data = await this.reservaService.findAll(); // Generar PDF para todas las reservas
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
