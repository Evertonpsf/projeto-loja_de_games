import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { Produto } from "../../produto/entities/produto.entity";


@Entity({ name: "tb_categoria" })// aqui esatamos criando a tabela temas. as chaves serve para indicar que é uma propriedade.
export class Categoria {
    // classe Categoria, alguns atributos relacionado abaixo.

    @PrimaryGeneratedColumn({type: 'bigint'}) // essa é a chave primaria autoincremental. decorador tem que ficar encima do atributo, nao deixar espaço.
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // a descricao nao pode ser vazio, tem que ser digitado algo, aqui estamos obrigado o usuario a digitar.
    @Column({ length: 1000, nullable: false })
    descricao: string;

    //este lado é um para muitos, ou seja muitas postagens possui um tema 
    @OneToMany(() => Produto, (produto) => produto.categoria) // aqui criamos a calsse bidirecional, que veio da outra classe postagem.entity
    produto: Produto[]
}