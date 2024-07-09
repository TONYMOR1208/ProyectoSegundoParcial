import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ResenaService } from './resena.service';
import { Resena } from './entities/resena.entity';
import { PdfGeneratorService } from '../pdf.service';

@Resolver(() => Resena)
export class ResenaResolver {
  constructor(
    private readonly resenaService: ResenaService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Resena], { name: 'Resena' })
  findAll() {
    return this.resenaService.findAll();
  }

  @Query(() => Resena, { name: 'Resenas' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.resenaService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdfResena' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('resenaId', { nullable: true, type: () => Int }) resenaId?: number,
  ) {
    let data;

    if (resenaId) {
      const libro = await this.resenaService.findOne(resenaId);
      if (!libro) {
        throw new Error(`No se encontró ningún libro con ID ${resenaId}`);
      }
      data = [Resena]; // Generar PDF para un libro específico
    } else {
      data = await this.resenaService.findAll(); // Generar PDF para todos los libros
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