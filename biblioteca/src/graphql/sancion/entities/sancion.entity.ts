import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@ObjectType()
@Entity({name: 'sancion'})
export class Sancion {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  usuario_id: number;

  @Field()
  @Column()
  fecha_inicio: Date;

  @Field()
  @Column()
  fecha_fin: Date;

  @Field()
  @Column()
  descripcion: string;

  @ManyToOne(
    () => Usuario, 
    usuario => usuario.sancion,
    {eager: true})
  usuario: Usuario;
}
