import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { CategoriaModules } from './categoria/categoria.module';
import { ProdutoModules } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    // estamos fazendo a conexão com o banco de dados.
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'db_lojadegames',
    entities: [Categoria, Produto ],
    synchronize: true,
    logging: true,
    bigNumberStrings: false,

  }),
  CategoriaModules,
  ProdutoModules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
