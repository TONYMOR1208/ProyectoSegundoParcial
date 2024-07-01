import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdonisService } from './adonis/adonis.service';
import { AnthonyService } from './anthony/anthony.service';
import { HttpModule } from '@nestjs/axios';
import { AdonisController } from './adonis/adonis.controller';
import { AnthonyController } from './anthony/anthony.controller';

@Module({
  imports: [HttpModule], // Importa HttpModule aquí
  controllers: [AppController, AdonisController, AnthonyController],
  providers: [AppService, AdonisService, AnthonyService],
})
export class AppModule {}
