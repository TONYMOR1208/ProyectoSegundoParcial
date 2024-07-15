import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Prestamo } from 'src/graphql/prestamo/entities/prestamo.entity';

@ObjectType()
@Entity('devolucion')
export class Devolucion {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  prestamo_id: number;

  @Field()
  @Column()
  fecha_devolucion: Date;

  @Field()
  @Column()
  estado_libro: string;

  @ManyToOne(
    () => Prestamo, 
    prestamo => prestamo.devolucion,
    {eager:true })
  @JoinColumn({name: 'prestamo_id'})
  prestamo: Prestamo;
}