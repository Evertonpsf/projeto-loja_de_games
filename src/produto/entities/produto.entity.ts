import { IsNotEmpty, IsNumber } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Categoria } from "../../categoria/entities/categoria.entity";


@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

        @IsNotEmpty()
    @Column({length: 255, nullable: false })
    nome: string;

    @IsNotEmpty()
    @Column({length: 255, nullable: false })
    console: string;
    
    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({ type: "decimal", precision: 10, scale: 2})
    preco: number;

    @Column()
    foto: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE" // so tem esse delete aqui por que aqui é a classe filha, ela que tem que ser deletada e nao a principal
    })

    categoria: Categoria;
    
    @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
        onDelete: "CASCADE" // so tem esse delete aqui por que aqui é a classe filha, ela que tem que ser deletada e nao a principal
    })

    usuario: Usuario; // essa relacao é do tipo asssociacao, o objeto da classe categoria na classe produto
   // usuario: any;

  
}