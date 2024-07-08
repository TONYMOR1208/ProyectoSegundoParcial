import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Prestamo } from '../../prestamo/entities/prestamo.entity';
import { Resena } from '../../resena/entities/resena.entity';
import { Reserva } from '../../reserva/entities/reserva.entity';
import { Sancion } from '../../sancion/entities/sancion.entity';


@ObjectType()
@Entity({name: 'usuario'})
export class Usuario {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  direccion: string;

  @Field()
  @Column()
  telefono: string;

  @Field()
  @Column()
  correo: string;

  @Field()
  @Column()
  fecha_registro: Date;

  @OneToMany(
    () => Prestamo, 
    prestamo => prestamo.usuario,
    { cascade: true})
  prestamo: Prestamo[];

  @OneToMany(
    () => Resena, 
    resena => resena.usuario,
    { cascade: true})
  resena: Resena[];

  @OneToMany(
    () => Reserva, 
    reserva => reserva.usuario,
    { cascade: true})
  reserva: Reserva[];

  @OneToMany(
    () => Sancion, 
    sancion => sancion.usuario,
    { cascade: true})
  sancion: Sancion[];
}