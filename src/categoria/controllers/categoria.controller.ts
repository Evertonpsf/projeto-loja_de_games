import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../service/categoria.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller("/categorias")  // esta classe é do tipo controladora
export class CategoriaController {

    constructor(private readonly categoriaService: CategoriaService) { }

    @Get()
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findAll(): Promise<Categoria[]> { // este metodo vai devolver a promise
        return this.categoriaService.findAll(); // estamos chamando o metodo que esta em service
    }

    @Get('/:id')// estamos definindo que o id é uma variavel e ele que vamos buscar na linha 26
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {  // Atravees do decorador Param deve ser convertido de string para numero  e reconhecer a variavel de caminho, para fazer este conhecimento da url que deve ser inserido na variavel.
        return this.categoriaService.findById(id);
    }

    @Get('/descricao/:descricao')//colocamos assim('/nome/:nome') para nao confundir com o id na hora da busca.  Estamos definindo que o nome é uma variavel e ele que vamos buscar na linha 31
    @HttpCode(HttpStatus.OK) // Http status 200, ele retorna isso se estiver tudo certo.
    findByTitulo(@Param('descricao',) descricao: string): Promise<Categoria[]> {
        return this.categoriaService.findByTitulo(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) // Http Status 201 de confirmacao para criacao de algo.
    create(@Body () produto: Categoria): Promise<Categoria> { // aqui vamos pegar o objeto do corpo da requisicao atrves do formato J-son que e o @Body
        return this.categoriaService.create(produto); 
    }

    @Put()
    @HttpCode(HttpStatus.OK) // Http status 200
    update(@Body () produto: Categoria): Promise<Categoria> { // estamos fazendo a atualizacao
        return this.categoriaService.update(produto); 
    }
    @Delete('/:id')// estamos definindo que o id é uma variavel e ele que vamos buscar 
    @HttpCode(HttpStatus.NO_CONTENT) // Http status 200, ele retorna isso se estiver tudo certo.
    delete(@Param('id', ParseIntPipe) id: number){  // Atravees do decorador Param deve ser convertido de string para numero  e reconhecer a variavel de caminho, para fazer este conhecimento da url que deve ser inserido na variavel.
        return this.categoriaService.delete(id);

}

}