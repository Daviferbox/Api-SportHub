import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import { v4 as uuid } from "uuid";
import { criaUsuarioDTO} from "./dto/criaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { atualizaUsuario } from "./dto/alteraUsuario.dto";



@Controller("/usuarios")
    export class UsuarioController{
    constructor(private usuario: UsuariosArmazenados){
            
    }   
    
    @Post()
        async criaUsuario(@Body()dadosUsuario: criaUsuarioDTO){

            var newUsuario = new UsuarioEntity(uuid(), dadosUsuario.nome, dadosUsuario.email, dadosUsuario.senha, dadosUsuario.contato, );
                console.log (newUsuario);

            this.usuario.AdicionarUsuario(newUsuario)
            var retorno={
                newUsuario,
                message: 'Usuario cadastrado.; com sucesso'
            }
        return retorno
    }

    @Get()
        async retornaUsuario(){
            var usuarioListados = this.usuario.Usuarios
            const ListaRetorno = usuarioListados.map(
                usuario => new ListaUsuarioDTO(
                    usuario.id,
                    usuario.nome,
                    usuario.email,
                    usuario.senha,
                    usuario.contato
                )
            )
            return ListaRetorno
        }
    
    @Put('/:id')
        async alteraUsuario(@Param('id') id: string, @Body() dadosAtualizacao: ListaUsuarioDTO) {
            const usuarioAtualizado = await this.usuario.atualizaUsuario(id, dadosAtualizacao);
            return {
                usuario: usuarioAtualizado,
                message: 'Usuário atualizado '
            };
        }


    @Delete('/:id')
        async removeUsuario(@Param('id') id: string) {
            const usuarioRemovido = await this.usuario.removeUsuario(id)

            return{
                user: usuarioRemovido,
                message: "Usuário removido com sucesso"
            }
        }



}


export { UsuariosArmazenados };
