import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaService } from "./service/categoria.service";
import { CategoriaController } from "./controllers/categoria.controller";



@Module({
    imports: [TypeOrmModule.forFeature([Categoria])], // coisas que vao ser importadas para o modulos
    providers: [CategoriaService], //CategoriaService], // classe de servicos
    controllers: [CategoriaController], // classe controladora
    exports: [TypeOrmModule], // deixar disponivel para outros modulos

})

export class CategoriaModules {}