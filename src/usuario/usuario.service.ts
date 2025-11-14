import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RetornoPadraoDTO } from 'src/dto/retornoPadrao.dto';
import { USUARIO } from './usuario.entity';
import { criaUsuarioDTO } from './dto/criaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';
// import Datas from 'src/utils/datas';





@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<USUARIO>,
  ) {}

  async listar(): Promise<any[]> {

    var usuarios = await (this.usuarioRepository
      .createQueryBuilder('usuario')
      .select('usuario.ID', 'ID')
      .addSelect('PS.NOME', 'NOME')
    //   .addSelect('usuario.foto', 'FOTO')
      .addSelect('usuario.email', 'EMAIL')
      .getRawMany());
    return usuarios;
  }

  async listarID(ID: string): Promise<any> {

    var usuario = await (this.usuarioRepository
      .createQueryBuilder('usuario')
      .select('usuario.ID', 'ID')
      .addSelect('PS.NOME', 'NOME')
      .addSelect('usuario.email', 'EMAIL')
    //   .addSelect('usuario.foto', 'FOTO')
      .andWhere('usuario.ID = :ID', { ID: `${ID}` })
      .getRawOne());
    return usuario;
  }

  async inserir(dados: criaUsuarioDTO): Promise<RetornoPadraoDTO> {
    let usuario = new USUARIO();
    usuario.ID = uuid();

    usuario.NOME = dados.NOME;
    usuario.EMAIL = dados.EMAIL;
    usuario.trocaSenha(dados.SENHA)
    usuario.CONTATO = dados.CONTATO;
    // usuario.FOTO = dados.FOTO;


    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoPadraoDTO>{
          data: usuario.ID,
          message: "Usuario cadastrado com sucesso!"
        };
      })
      .catch((error) => {
        return <RetornoPadraoDTO>{
          data: "",
          message: "Houve um erro ao cadastrar." + error.message
        };
      })


  }



  async localizarID(id: string): Promise<USUARIO> {
        const genero = await this.usuarioRepository.findOne({
            where: { ID: id },
        });
        if (!genero) {
            throw new Error('Usuario não encontrado!');
        }
        return genero
    }

  async localizarEmail(email: string): Promise<USUARIO> {
        const localiEmail = await this.usuarioRepository.findOne({
            where: { EMAIL: email },
        });
        if (!localiEmail) {
            throw new Error('Usuario não encontrado!!');
        }
        return localiEmail
    }


  async Login(email: string, senha: string) {
    //primeiro é pesquisado o usuário por meio do email
    const possivelUsuario = await this.localizarEmail(email)

    return {
      //aqui é validada a senha, caso a senha esteja correta, é retornado os dados do usuário e também o status (true para correto, false para incorreto)
      usuario: possivelUsuario ? (possivelUsuario.login(senha) ? possivelUsuario : null) : null,
      status: possivelUsuario ? possivelUsuario.login(senha): false
    };
  }

  async validaEmail(emailNovo: string) {
    try{
      const possivelUsuario = await this.localizarEmail(emailNovo)
    }
    catch{
        return true;
    }
    finally{
        return false;
    }
    
  }


  async remover(id: string): Promise<RetornoPadraoDTO> {
    const usuario = await this.localizarID(id);
    

    return this.usuarioRepository.remove(usuario)
      .then((result) => {
        return <RetornoPadraoDTO>{
          data: usuario,
          message: "USUARIO excluido!"
        };
      })
      .catch((error) => {
        return <RetornoPadraoDTO>{
          data: usuario,
          message: "Houve um erro ao excluir." + error.message
        };
      });
  }

  async alterar(id: string, dados: AtualizaUsuarioDTO): Promise<RetornoPadraoDTO> {
    const usuario = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
        if (chave === 'ID') {
          return;
        }
        else if( chave === 'SENHA'){
          usuario.trocaSenha(valor);
        }
        else{
          usuario[chave] = valor;
        }
      }
    )

    return this.usuarioRepository.save(usuario)
      .then((result) => {
        return <RetornoPadraoDTO>{
          data: usuario.ID,
          message: "Usuario alterado com sucesso!"
        };
      })
      .catch((error) => {
        return <RetornoPadraoDTO>{
          data: "",
          message: "Houve um erro ao alterar." + error.message
        };
      });
  }
}