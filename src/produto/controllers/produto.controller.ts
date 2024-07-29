import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProdutoService } from "../services/produto.service";
import { Produto } from "../entities/produto.entity";


@Controller("/produtos")  // esta classe é do tipo controladora
export class ProdutoController {

    constructor(private readonly produtoService: ProdutoService) { }

    @Get()
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findAll(): Promise<Produto[]> { // este metodo vai devolver a promise
        return this.produtoService.findAll(); // estamos chamando o metodo que esta em service
    }

    @Get('/:id')// estamos definindo que o id é uma variavel 
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {  // Atravees do decorador Param deve ser convertido de string para numero  e reconhecer a variavel de caminho, para fazer este conhecimento da url que deve ser inserido na variavel.
        return this.produtoService.findById(id);
    }

    @Get('/nome/:nome')//colocamos assim('/nome/:nome') para nao confundir com o id na hora da busca.  Estamos definindo que o nome é uma variavel e ele que vamos buscar na linha 31
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findByTitulo(@Param('nome',) nome: string): Promise<Produto[]> {
        return this.produtoService.findByTitulo(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) // Http Status 201 de confirmacao para criacao de algo.
    create(@Body() produto: Produto): Promise<Produto> { // aqui vamos pegar o objeto do corpo da requisicao atrves do formato J-son que e o @Body
        return this.produtoService.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK) // Http status 200
    update(@Body() produto: Produto): Promise<Produto> { // estamos fazendo a atualizacao
        return this.produtoService.update(produto);
    }
    @Delete('/:id')// estamos definindo que o id é uma variavel e ele que vamos buscar 
    @HttpCode(HttpStatus.NO_CONTENT) // Http status 200, ele retorna isso se estiver tudo certo.
    delete(@Param('id', ParseIntPipe) id: number) {  // Atravees do decorador Param deve ser convertido de string para numero  e reconhecer a variavel de caminho, para fazer este conhecimento da url que deve ser inserido na variavel.
        return this.produtoService.delete(id);
    }
        @Get('/preco-maior/:preco')
        findByPrecoMaior(@Param('preco',ParseFloatPipe) preco: number): Promise < Produto[] > {
            return this.produtoService.findByPrecoMaior(preco);
        }
        @Get('/preco-menor/:preco')
        @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
        findByPrecoMenor(@Param('preco',ParseFloatPipe) preco: number): Promise < Produto[] > {
            return this.produtoService.findByPrecoMenor(preco);
        }

    
    }

