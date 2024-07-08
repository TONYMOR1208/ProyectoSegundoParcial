import { Module } from '@nestjs/common';
import { PrestamoService } from './prestamo.service';
import { PrestamoResolver } from 'src/graphql/prestamo/prestamo.resolver';

@Module({
  providers: [PrestamoResolver, PrestamoService],
})
export class PrestamoModule {}
