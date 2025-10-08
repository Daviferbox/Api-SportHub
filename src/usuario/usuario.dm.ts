import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuariosArmazenados{
    #usuarios: UsuarioEntity[] = [];  

    AdicionarUsuario(usuario: UsuarioEntity){
            this.#usuarios.push(usuario);
        
    }

    async validaEmail(email: string): Promise<boolean>{
        const usuarioEncontrado = this.#usuarios.find(u => u.email === email);
        return usuarioEncontrado !== undefined;
    }

    private BuscaPorID(id: string): UsuarioEntity {
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if (!possivelUsuario) {
            throw new Error('Usuário não encontrado');
        }
        return possivelUsuario;
    }

    async removeUsuario(id: string) {
        const usuario = this.BuscaPorID(id);

        this.#usuarios = this.#usuarios.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        );

        return usuario;
    }
 
    async atualizaUsuario(id: string, dadosAtualizacao: Partial<UsuarioEntity>) {
        var possivelUsuario = this.BuscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return;
                }else if (valor === undefined) {
                    return;

                }
                possivelUsuario[chave] = valor;
            }
        );

        return possivelUsuario;
    }

    get Usuarios(){        
        return this.#usuarios;
    }
}