import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfGeneratorService {
  async generatePdf(data: any[], consultaNombre?: string): Promise<string> {
    const doc = new PDFDocument({ layout: 'landscape' }); // Establece el layout a horizontal
    const directoryPath = 'C:\\Users\\Adonis Velez\\OneDrive\\Escritorio\\ProyectoSegundoParcial\\biblioteca';
    const fileName = consultaNombre ? `${consultaNombre}.pdf` : 'reporte.pdf';
    const filePath = path.join(directoryPath, fileName);

    try {
      this.createDirectoryIfNotExists(directoryPath);

      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      this.addContentToPdf(doc, data);

      return new Promise((resolve, reject) => {
        writeStream.on('finish', () => {
          resolve(filePath);
        });
        doc.on('error', (error) => {
          fs.unlinkSync(filePath);
          reject(error);
        });
      });
    } catch (error) {
      throw new Error(`Error al generar el PDF: ${error.message}`);
    }
  }

  private createDirectoryIfNotExists(directoryPath: string) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
  }

  private addContentToPdf(doc: PDFKit.PDFDocument, data: any[]) {
    doc.font('Helvetica-Bold').fontSize(18).text('Reporte Generado', { align: 'center', underline: true }).moveDown(0.5);
    
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      // Ejemplo de creación de tabla para datos en formato array de objetos
      this.createTable(doc, data);
    } else {
      // Mostrar mensaje de error si los datos no son válidos
      doc.fontSize(12).text(' ERROR: LOS DATOS PROPORCIONADOS NO SON VALIDOS PARA GENERAR EL REPORTE.', { align: 'left' });
    }

    doc.end();
  }

  private createTable(doc: PDFKit.PDFDocument, data: any[]) {
    const tableTop = 150; // Posición inicial de la tabla
    const tableLeft = 50; // Margen izquierdo
    const tableRight = doc.page.width - 50; // Margen derecho ajustado al ancho de la página
    const rowHeight = 30;
    const colWidth = (tableRight - tableLeft) / Object.keys(data[0]).length;

    let yPosition = tableTop;

    // Encabezados de columna
    doc.font('Helvetica-Bold').fillColor('#2c3e50').fontSize(12);
    Object.keys(data[0]).forEach((header, colIndex) => {
      doc.rect(tableLeft + colIndex * colWidth, yPosition, colWidth, rowHeight).fill('#f39c12'); // Fondo naranja para encabezados
      doc.fillColor('#ffffff').text(header, tableLeft + colIndex * colWidth + 10, yPosition + 10, { width: colWidth - 20, align: 'left' });
    });

    yPosition += rowHeight;

    // Datos de filas
    doc.font('Helvetica').fontSize(10);
    data.forEach((row, rowIndex) => {
      Object.entries(row).forEach(([key, value], colIndex) => {
        // Asegúrate de que cada valor sea convertido a String para evitar [object Object]
        const textValue = this.formatCellValue(value);
        
        doc.rect(tableLeft + colIndex * colWidth, yPosition, colWidth, rowHeight).fill(rowIndex % 2 === 0 ? '#ecf0f1' : '#ffffff'); // Alternancia de color en filas
        
        const textOptions = {
          width: colWidth - 20,
          align: 'left' as const // Asegura que 'align' sea uno de los tipos permitidos
        };
        doc.fillColor('#2c3e50').text(textValue, tableLeft + colIndex * colWidth + 10, yPosition + 10, textOptions);
      });
      yPosition += this.getRowHeight(doc, row, colWidth, tableLeft, tableRight);

      // Verifica si hay espacio suficiente para más filas
      if (yPosition > doc.page.height - 50 && rowIndex !== data.length - 1) {
        doc.addPage({ layout: 'landscape', margin: 50 }); // Agrega una nueva página horizontalmente
        yPosition = tableTop; // Reinicia la posición para comenzar en la parte superior de la nueva página
        
        // Vuelve a dibujar encabezados de columna en nueva página
        doc.font('Helvetica-Bold').fillColor('#2c3e50').fontSize(12);
        Object.keys(data[0]).forEach((header, colIndex) => {
          doc.rect(tableLeft + colIndex * colWidth, yPosition, colWidth, rowHeight).fill('#f39c12'); // Fondo naranja para encabezados
          doc.fillColor('#ffffff').text(header, tableLeft + colIndex * colWidth + 10, yPosition + 10, { width: colWidth - 20, align: 'left' });
        });

        yPosition += rowHeight;
      }
    });

    // Líneas de la tabla
    doc.lineWidth(0.5).strokeColor('#bdc3c7');
    data.forEach((row, rowIndex) => {
      doc.moveTo(tableLeft, tableTop + (rowIndex + 1) * rowHeight)
         .lineTo(tableRight, tableTop + (rowIndex + 1) * rowHeight)
         .stroke();
    });
  }

  private getRowHeight(doc: PDFKit.PDFDocument, row: any, colWidth: number, tableLeft: number, tableRight: number): number {
    let maxHeight = 0;

    Object.entries(row).forEach(([key, value], colIndex) => {
      const textValue = this.formatCellValue(value);
      const textOptions = {
        width: colWidth - 20,
        align: 'left' as const
      };

      const textHeight = doc.heightOfString(textValue, textOptions);
      maxHeight = Math.max(maxHeight, textHeight);
    });

    return Math.max(maxHeight + 20, 30); // Ajuste mínimo de altura de fila
  }

  private formatCellValue(value: any): string {
    if (typeof value === 'object') {
      // Formato específico para objetos (aquí puedes personalizar según tus necesidades)
      return `${value.nombre}`;
    } else {
      // Asegúrate de que cada valor sea convertido a String para evitar [object Object]
      return String(value);
    }
  }
}
