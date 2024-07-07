import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GeneroService } from './genero.service';
import { PdfGeneratorService } from '../pdf.service';
import { Genero } from './entities/genero.entity';

@Resolver(() => Genero)
export class GeneroResolver {
  constructor(
    private readonly generoService: GeneroService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Genero], { name: 'generos' })
  findAll() {
    return this.generoService.findAll();
  }

  @Query(() => Genero, { name: 'genero' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.generoService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdf' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('generoId', { nullable: true, type: () => Int }) generoId?: number,
  ) {
    let data;

    if (generoId) {
      const genero = await this.generoService.findOne(generoId);
      if (!genero) {
        throw new Error(`No se encontró ningún género con ID ${generoId}`);
      }
      data = [genero]; // Generar PDF para un género específico
    } else {
      data = await this.generoService.findAll(); // Generar PDF para todos los géneros
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
