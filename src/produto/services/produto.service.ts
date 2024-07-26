
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../entities/produto.entity";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from "typeorm";
import { CategoriaService } from "../../categoria/service/categoria.service";

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) { }


    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true // tem que fazer isso para quando buscar as postagens exibir o categoria que esta relacionado
            }
        });
    }

    async findById(id: number): Promise<Produto> {


        let buscaProduto = await this.produtoRepository.findOne({// aqui estamos buscando uma produto, por id por isso passamos o id
            where: {
                id
            },
            relations: {
                categoria: true
            }
        })

        if (!buscaProduto)
            throw new HttpException('O Produto não foi encontrada!', HttpStatus.NOT_FOUND);

        return buscaProduto;

    }

    async findByTitulo(nome: string): Promise<Produto[]> { // o colchete indica que pode ser que traga mais de um nome, serve para mostrar os que puxarem.
        // estamos fazendo o metodo para buscar apenas uma ocorrencia no banco de dados, no caso o nome.

        return this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`) // usamos o ILike pois é insensitivo, assim busca o nome independente da forma que esteja escrito, em maisculo ou minusculo.
            },
            relations: {
                categoria: true
            }
        })

    }
    async create(produto: Produto): Promise<Produto> { // aqui estamos criando o metodo de produto, para fazer a produto

        if (produto.categoria) { // aqui abaixo foi criado o id do categoria, verificando se existe por isso tem o if.

            let categoria = await this.categoriaService.findById(produto.categoria.id)// isso e para verificar se enontrou o categoria

            if (!categoria)
                throw new HttpException('Produto nao foi encontrado', HttpStatus.NOT_FOUND)
        }
        return await this.produtoRepository.save(produto);

    }

    async update(produto: Produto): Promise<Produto> {

        let buscaProduto = await this.findById(produto.id);

        if (!buscaProduto || !produto.id) // esta checando se buscaProduto é diferente de nulo, ou se nao foi passado id vai devolver uma excessao
            throw new HttpException('A Produto não foi encontrada!', HttpStatus.NOT_FOUND)
        // a diferenca do criar para o atualizar é que no criar nao passsa o id e aqui no atuhalizar passa, este metodo atualiza o objeto inteiro.

        // se o usuario indicou
        if (produto.categoria) { // aqui abaixo foi criado o id do categoria, verificando se existe por isso tem o if.

            await this.categoriaService.findById(produto.categoria.id)// isso e para verificar se enontrou o categoria

            return await this.produtoRepository.save(produto);
        }

        // se o usuariio nao indicou o categoria
        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {
        // estamos fazendo o metodo para deletar apenas uma ocorrencia no banco de dados.

        await this.findById(id)

        return await this.produtoRepository.delete(id);

    }
    
    async findByPrecoMaior(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.findBy({preco: MoreThan(preco)});
      }
      async findByPrecoMenor(preco: number): Promise<Produto[]> {
        return await this.produtoRepository.findBy({preco: LessThan(preco)});
      }
}