import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Libro } from 'src/graphql/libro/entities/libro.entity';
import { Usuario } from 'src/graphql/usuario/entities/usuario.entity';


@ObjectType()
@Entity({name: 'reserva' })
export class Reserva {
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
  fecha_reserva: Date;

  @Field()
  @Column()
  fecha_expiracion: Date;

  @ManyToOne(
    () => Libro, 
    libro => libro.reserva,
    {eager:true })
    @JoinColumn({name: 'libro_id'})
  libro: Libro;

 @ManyToOne(
    () => Usuario, 
    usuario => usuario.reserva,
    {eager:true })
    @JoinColumn({name: 'usuario_id'})
  usuario: Usuario;
}
