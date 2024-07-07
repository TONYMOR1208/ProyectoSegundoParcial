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



@Module({
  imports: [AutorModule, GeneroModule, LibroModule ],
  controllers: [],
  providers: [],
})
export class graphQLModule{}
