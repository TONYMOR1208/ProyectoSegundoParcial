import { Module } from '@nestjs/common';
import { DevolucionService } from './devolucion.service';
import { DevolucionResolver } from './devolucion.resolver';

@Module({
  providers: [DevolucionResolver, DevolucionService],
})
export class DevolucionModule {}
