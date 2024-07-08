import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Autor } from '../../autor/entities/autor.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Genero } from '../../genero/entities/genero.entity';
import { Prestamo } from '../../prestamo/entities/prestamo.entity';
//import { Resena } from './resena.entity';
import { Reserva } from '../../reserva/entities/reserva.entity';


@ObjectType()
@Entity({ name: 'libro' })
export class Libro {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field( () => String)
  @Column()
    titulo: string;


  @Field( () => Int)
  @Column()
  autor_id: number;


  @Field( () => Int)
  @Column()
  genero_id : number;


  @Field( () => String)
  @Column()
  editorial: string;


  @Field( () => Int)
  @Column({ name: 'año_publicacion'})
  anio_publicacion: number;

  @Field( () => Int)
  @Column()
  num_ejemplares: number;


  @ManyToOne(
    () => Autor, 
    autor => autor.libro,
    {eager:true })
    @JoinColumn({ name: 'autor_id' })
  autor: Autor;

  @ManyToOne(
    () => Genero, 
    genero => genero.libro,
    {eager:true })
    @JoinColumn({ name: 'genero_id' })
  genero: Genero;

  @OneToMany(
  () => Prestamo, 
  prestamo => prestamo.libro,
  {cascade: true })
  prestamo: Prestamo[];

/*   @OneToMany(
  () => Resena, 
   resena => resena.libro,
    {cascade: true })
  resena: Resena[];
 */
  @OneToMany(
    () => Reserva, 
    reserva => reserva.libro,
  {cascade: true })
  reserva: Reserva[];
}
