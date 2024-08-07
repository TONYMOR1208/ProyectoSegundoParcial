import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { AutorModule } from './autor/autor.module';
import { GeneroModule } from './genero/genero.module';
import { LibroModule } from './libro/libro.module';
import { PrestamoModule } from './prestamo/prestamo.module';
import { DevolucionModule } from './devolucion/devolucion.module';
import { ReservaModule } from './reserva/reserva.module';
import { ResenaModule } from './resena/resena.module';
import { UsuarioModule } from './usuario/usuario.module';
import { SancionModule } from './sancion/sancion.module';



@Module({
  imports: [AutorModule, GeneroModule, LibroModule, PrestamoModule,  DevolucionModule, ReservaModule, ResenaModule, UsuarioModule, SancionModule ],
  controllers: [],
  providers: [],
})
export class graphQLModule{}
