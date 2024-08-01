import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";


@Injectable()
export class CategoriaService {
    [x: string]: any;
   
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { } 


    async findAll(): Promise<Categoria[]> {
        return await this.categoriaRepository.find({
            relations:{
                produto: true
            }
        });
    }

    async findById(id: number): Promise<Categoria> {


        let buscaCategoria = await this.categoriaRepository.findOne({// aqui estamos buscando uma postagem, por id por isso passamos o id
            where: {id},
            relations:{ produto: true}
        })

        if (!buscaCategoria)
            throw new HttpException('A Categoria nao foi encontrado!', HttpStatus.NOT_FOUND);

        return buscaCategoria;
    }

    async findByDescricao(descricao: string): Promise<Categoria[]> { // o colchete indica que pode ser que traga mais de um titulo, serve para mostrar os que puxarem.
        // estamos fazendo o metodo para buscar apenas uma ocorrencia no banco de dados, no caso o titulo.

        return this.categoriaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`) // usamos o ILike pois é insensitivo, assim busca a descricao independente da forma que esteja escrito, em maisculo ou minusculo.
            },
            relations:{produto: true}
        })
    }
    async create(categoria: Categoria): Promise<Categoria> { // aqui estamos criando o metodo de categoria, para fazer um categoria
        return await this.categoriaRepository.save(categoria);
    }

    async update(categoria: Categoria): Promise<Categoria> {

        let buscaCategoria = await this.findById(categoria.id);

        if (!buscaCategoria || !categoria.id) // esta checando se buscaCategoria é diferente de nulo, ou se nao foi passado id vai devolver uma excessao
            throw new HttpException('A Categoria não foi encontrado!', HttpStatus.NOT_FOUND)
        // a diferenca do criar para o atualizar é que no criar nao passsa o id e aqui no atualizar passa, este metodo atualiza o objeto inteiro.

        return await this.categoriaRepository.save(categoria);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        // estamos fazendo o metodo para deletar apenas uma ocorrencia no banco de dados.

        let buscaCategoria = await this.findById(id)

        if (!buscaCategoria)
            throw new HttpException('A Categoria não foi encontrada!', HttpStatus.NOT_FOUND);
        return await this.categoriaRepository.delete(id);

    }
}