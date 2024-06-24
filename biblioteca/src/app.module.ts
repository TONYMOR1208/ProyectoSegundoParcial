import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdonisService } from './adonis/adonis.service';
import { HttpModule } from '@nestjs/axios';
import { AdonisController } from './adonis/adonis.controller';
@Module({
  imports: [HttpModule],
  controllers: [AppController, AdonisController],
  providers: [AppService, AdonisService],
})
export class AppModule {}
