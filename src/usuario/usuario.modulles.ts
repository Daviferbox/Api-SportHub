import { Module} from "@nestjs/common"
import { UsuarioController } from "./usuario.controllers"
import { EmailUnicoValidator } from "../validator/emailValidator"

@Module({
    controllers: [UsuarioController],
    providers: [EmailUnicoValidator],
})
export class UsuarioModule{}