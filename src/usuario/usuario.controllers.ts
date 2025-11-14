import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { criaUsuarioDTO } from "./dto/criaUsuario.dto";
import {  ListagemUsuariosDTO, ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/atualizaUsuario.dto";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDTO } from "./dto/login.dto";
import { RetornoPadraoDTO } from "src/dto/retornoPadrao.dto";
import { UsuarioService } from "./usuario.service";

@Controller('/usuarios')
@ApiTags('usuarios')
export class UsuarioController {
   constructor(private readonly usuarioService: UsuarioService){
        
    }

     @Post()//essa linha, seria um decorator para definir que a função é um metodo POST
    //Para receber dados do body da requisição, deve utilizar o decorator de "Body", especificando depois a variavel
    @ApiCreatedResponse({ description:'Retorna que houve sucesso na inclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na inclusão.'})
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO): Promise <RetornoPadraoDTO>{       
        //criação do objeto de usuário, aqui é criado um objeto específico desse usuário 
        try{
            return this.usuarioService.inserir(dadosUsuario) 
        }
        catch(error){
            throw new InternalServerErrorException('Erro inesperado no servidor : '+error.message);
        }
    }

    @Post('/login')//linha que define o método post para login, nesse caso é idenficado o URL,
    @ApiResponse({status: 201, description:'Retorna que houve sucesso na consulta'})    
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    async fazerLogin(@Body() dadosLogin: LoginDTO){
        //chamada da função de login
        try{
          var retornoLogin = await this.usuarioService.Login(dadosLogin.EMAIL,dadosLogin.SENHA)
          //criação de retorno, onde caso a resposta seja true é retornado login efetuado, caso seja false, retorna email ou senha invalidos, também é retornado o usuário logado

          var retorno = new RetornoPadraoDTO(retornoLogin.status?'Login efetuado, sucesso':'Email ou senha invalidos!',retornoLogin.usuario);        

          return retorno;       
        }
        catch(error){
            throw new InternalServerErrorException('Erro inesperado no servidor : '+error.message);
        }
        
    }

    @Put('/:id')//linha que define o método vai ser de alteração (put), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na alteração'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na alteração.'})
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    async alteraUsuario(@Body() dadosNovos:  AtualizaUsuarioDTO,@Param('id') id: string){//aqui é definido que vai receber dados tanto do body quanto da URL(param)
        //aqui é chamada a função de alteração de usuário, onde ja é feita toda a modificação do usuário
        try{
          return this.usuarioService.alterar(id,dadosNovos)             
        }
        catch(error){
            throw new InternalServerErrorException('Erro inesperado no servidor : '+error.message);
        }
    }

    @Delete('/:id')//linha que define o método vai ser de exclusão (delete), nesse caso também é especificado um parametro na URL, por onde vai chegar o id do usuário
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na exclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na exclusão.'})
    async removeUsuario(@Param('id') id: string){//aqui é definido que vai receber dados da URL(param)
        //aqui é chamada a função de exclusão de usuário, onde ja é feita toda a exclusão do usuário
        try{
          return this.usuarioService.remover(id);   
        }
        catch(error){
            throw new InternalServerErrorException('Erro inesperado no servidor : '+error.message);
        }
    }

    @Get('/:ID')//criação de método GET, para retornar usuários filtrados pelo ID, onde é necessário passar o ID do usuário pelo url 
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na consulta.'})
    async retornaUsuarioId(@Param('ID') ID:string){
        //aqui é feita a pesquisa do usuário, depois é criado mapeado os dados desse usuário para um retorno padrão (lista usuario DTO)
        try{
        var usuariosListados = await this.usuarioService.listarID(ID);
        const ListaRetorno = new ListaUsuarioDTO(usuariosListados.ID,
                                                usuariosListados.NOME,
                                                usuariosListados.EMAIL,
                                                usuariosListados.CONTATO)
                                                // usuariosListados.FOTO)

        return {
                Usuario: ListaRetorno
            };
        }
        catch(error){
            throw new InternalServerErrorException('Erro inesperado no servidor : '+error.message);
        }
    }

    @Get()//aqui é criado um método GET sem nenhum tipo de recepção de dados, onde é retornada uma lista de uusários
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    async retornaUsuario(): Promise <ListagemUsuariosDTO>{
        //Aqui são pesquisados os usuários a serem listados, depois é feito um mapeamento de dados para retornar as informações no padrão de resposta esperado (listaUsuarioDTO)
        try{
          var usuariosListados = await this.usuarioService.listar();
          const ListaRetorno = usuariosListados.map(
              usuario => new ListaUsuarioDTO(
                  usuario.ID,
                  usuario.NOME,
                  usuario.EMAIL,
                  usuario.CONTATO
                  //usuario.FOTO
              )
          );

          const retorno = new ListagemUsuariosDTO(ListaRetorno);


          return retorno
          }
        catch(error){
            throw new InternalServerErrorException('Erro inesperado no servidor : '+error.message);
        }
    }
}











// import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
// import { USUARIO } from "./usuario.entity";
// import { UsuariosArmazenados } from "./usuario.dm";
// import { v4 as uuid } from "uuid";
// import { criaUsuarioDTO} from "./dto/criaUsuario.dto";
// import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
// import { atualizaUsuario } from "./dto/alteraUsuario.dto";







// // @Controller("/usuarios")
// //     export class UsuarioController{
// //     constructor(private usuario: UsuariosArmazenados){
            
// //     }   
    
// //     @Post()
// //         async criaUsuario(@Body()dadosUsuario: criaUsuarioDTO){

// //             var newUsuario = new UsuarioEntity(uuid(), dadosUsuario.nome, dadosUsuario.email, dadosUsuario.senha, dadosUsuario.contato, );
// //                 console.log (newUsuario);

// //             this.usuario.AdicionarUsuario(newUsuario)
// //             var retorno={
// //                 newUsuario,
// //                 message: 'Usuario cadastrado.; com sucesso'
// //             }
// //         return retorno
// //     }

// //     @Get()
// //         async retornaUsuario(){
// //             var usuarioListados = this.usuario.Usuarios
// //             const ListaRetorno = usuarioListados.map(
// //                 usuario => new ListaUsuarioDTO(
// //                     usuario.id,
// //                     usuario.nome,
// //                     usuario.email,
// //                     usuario.senha,
// //                     usuario.contato
// //                 )
// //             )
// //             return ListaRetorno
// //         }
    
// //     @Put('/:id')
// //         async alteraUsuario(@Param('id') id: string, @Body() dadosAtualizacao: ListaUsuarioDTO) {
// //             const usuarioAtualizado = await this.usuario.atualizaUsuario(id, dadosAtualizacao);
// //             return {
// //                 usuario: usuarioAtualizado,
// //                 message: 'Usuário atualizado '
// //             };
// //         }


// //     @Delete('/:id')
// //         async removeUsuario(@Param('id') id: string) {
// //             const usuarioRemovido = await this.usuario.removeUsuario(id)

// //             return{
// //                 user: usuarioRemovido,
// //                 message: "Usuário removido com sucesso"
// //             }
// //         }



// // }


// // export { UsuariosArmazenados };
