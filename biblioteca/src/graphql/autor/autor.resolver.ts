import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { AutorService } from './autor.service';
import { PdfGeneratorService } from '../pdf.service';
import { Autor } from './entities/autor.entity';

@Resolver(() => Autor)
export class AutorResolver {
  constructor(
    private readonly autorService: AutorService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Autor], { name: 'autores' })
  findAll() {
    return this.autorService.findAll();
  }

  @Query(() => Autor, { name: 'autor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.autorService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdfAutores' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('autorId', { nullable: true, type: () => Int }) autorId?: number,
  ) {
    let data;

    if (autorId) {
      const autor = await this.autorService.findOne(autorId);
      if (!autor) {
        throw new Error(`No se encontró ningún autor con ID ${autorId}`);
      }
      data = [autor]; // Generar PDF para un autor específico
    } else {
      data = await this.autorService.findAll(); // Generar PDF para todos los autores
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
