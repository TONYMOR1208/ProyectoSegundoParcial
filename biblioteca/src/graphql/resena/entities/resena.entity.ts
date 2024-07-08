import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from '../../libro/entities/libro.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';


@ObjectType()
@Entity('resena')
export class Resena {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  libro_id: number;

  @Field(() => Int)
  @Column()
  usuario_id: number;

  @Field(() => Int)
  @Column()
  calificacion: number;

  @Field()
  @Column()
  comentario: string;

  @ManyToOne(
    () => Libro, 
    libro => libro.resena,
    {eager:true })
  libro: Libro;

  @ManyToOne(
    () => Usuario, 
    usuario => usuario.resena,
    {eager:true })
  usuario: Usuario;
}
