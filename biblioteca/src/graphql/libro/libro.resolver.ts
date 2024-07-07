import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { LibroService } from './libro.service';
import { PdfGeneratorService } from '../pdf.service';
import { Libro } from './entities/libro.entity';

@Resolver(() => Libro)
export class LibroResolver {
  constructor(
    private readonly libroService: LibroService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  @Query(() => [Libro], { name: 'libros' })
  findAll() {
    return this.libroService.findAll();
  }

  @Query(() => Libro, { name: 'libro' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.libroService.findOne(id);
  }

  @Query(() => String, { name: 'generarPdfLibros' })
  async generatePdfQuery(
    @Args('consultaNombre', { nullable: true }) consultaNombre?: string,
    @Args('libroId', { nullable: true, type: () => Int }) libroId?: number,
  ) {
    let data;

    if (libroId) {
      const libro = await this.libroService.findOne(libroId);
      if (!libro) {
        throw new Error(`No se encontró ningún libro con ID ${libroId}`);
      }
      data = [libro]; // Generar PDF para un libro específico
    } else {
      data = await this.libroService.findAll(); // Generar PDF para todos los libros
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
