import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from '../../libro/entities/libro.entity';

@ObjectType()
@Entity({name: 'genero'})
export class Genero {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @OneToMany(
    () => Libro, 
    libro => libro.genero,
    { cascade: true})
  libro: Libro[];
}