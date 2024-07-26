import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "./entities/produto.entity";
import { ProdutoService } from "./services/produto.service";
import { ProdutoController } from "./controllers/produto.controller";
import { CategoriaModules } from "../categoria/categoria.module";
import { CategoriaService } from "../categoria/service/categoria.service";


@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModules], // coisas que vao ser importadas para o modulos
    providers: [ProdutoService, CategoriaService], // classe de servicos
    controllers: [ProdutoController], // classe controladora
    exports: [TypeOrmModule], // deixar disponivel para outros modulos

})

export class ProdutoModules {}