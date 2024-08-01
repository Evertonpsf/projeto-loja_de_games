import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) { // a importacao do que esta ultimo dentro do ultimo parentese(Strategy) tem que ser do local, ficar atento na importação
    constructor(private authService: AuthService) {
        super({

            usernameField: 'usuario' ,    // aqui informa o que buscara o nome do usuario
            passwordField: 'senha'   // aqui informa o que buscara a senha do usuario
        })
    }
    async validate(username: string, password: string): Promise<any>{
        const user = await this.authService.validateUser(username, password);

        if(!user)
            throw new UnauthorizedException();
        return user;

    }
}



