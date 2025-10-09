import { Module} from "@nestjs/common"
import { UsuarioController, UsuariosArmazenados } from "./usuario.controllers"
import { EmailUnicoValidator } from "src/validator/emailValidator"



@Module({
    controllers: [UsuarioController],
    providers: [EmailUnicoValidator,UsuariosArmazenados],
})
export class UsuarioModule{}