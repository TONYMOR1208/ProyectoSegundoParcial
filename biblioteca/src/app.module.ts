import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdonisService } from './adonis/adonis.service';
import { AnthonyService } from './anthony/anthony.service';
import { HttpModule } from '@nestjs/axios';
import { AdonisController } from './adonis/adonis.controller';
import { AnthonyController } from './anthony/anthony.controller';
import { CarlosService } from './carlos/carlos.service';
import { CarlosController } from './carlos/carlos.controller';
import { graphQLModule } from './graphql/graphql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';




@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: false,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  }),
    HttpModule, graphQLModule],
  controllers: [AppController, AdonisController, AnthonyController, CarlosController],
  providers: [AppService, AdonisService, AnthonyService, CarlosService],
})
export class AppModule {}
