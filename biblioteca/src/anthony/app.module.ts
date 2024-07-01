import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnthonyService } from './anthony.service';
import { AnthonyController } from './anthony.controller'; // Importa el controlador si es necesario

@Module({
  imports: [HttpModule],
  providers: [AnthonyService],
  controllers: [AnthonyController], // Añade aquí los controladores que uses en tu aplicación
})
export class AppModule {}
