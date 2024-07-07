import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from '../../libro/entities/libro.entity';

@ObjectType()
@Entity({ name: 'autor' })
export class Autor {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  bibliografia: string;

  @OneToMany(
    () => Libro, 
    libro => libro.autor,
    {cascade: true })
  libro: Libro[];
}