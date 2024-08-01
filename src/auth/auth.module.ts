import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthService } from "./services/auth.service";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthController } from "./controllers/auth.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register({            //Configura a propriedade signOptions (opções do processo de criação do token). Observe que dentro desta propriedade temos um array com as propriedades específicas do Método sign()
            secret: jwtConstants.secret,//da Classe JwtService, do Módulo JwtModule. 
            signOptions: { expiresIn: '1h'},//Vamos configurar a propriedade expiresIn (tempo de duração do Token JWT), com o valor 1h. O Token gerado terá validade de 1 hora, após este período será necessário gerar um novo.
        }),
    ],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt],

})
export class AuthModule { }