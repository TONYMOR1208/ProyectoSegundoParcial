import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from 'src/graphql/libro/entities/libro.entity';
import { Usuario } from 'src/graphql/usuario/entities/usuario.entity';
import { Devolucion } from 'src/graphql/devolucion/entities/devolucion.entity';


@ObjectType()
@Entity({name: 'prestamo'})
export class Prestamo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  libro_id: number;

  @Field(() => Int)
  @Column()
  usuario_id: number;

  @Field()
  @Column()
  fecha_prestamo: Date;

  @Field()
  @Column()
  fecha_vencimiento: Date;

  @Field()
  @Column()
  devuelto: boolean;

  @ManyToOne(
    () => Libro, 
    libro => libro.prestamo,
    {eager:true })
    @JoinColumn({name: 'libro_id'})
  libro: Libro;

@ManyToOne(
    () => Usuario, 
    usuario => usuario.prestamo,
    {eager:true })
    @JoinColumn({name: 'usuario_id'})
  usuario: Usuario;

  @OneToMany(
    () => Devolucion, 
    devolucion => devolucion.prestamo,
    {cascade: true })
  devolucion: Devolucion[];
}
