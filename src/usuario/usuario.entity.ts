    export class UsuarioEntity{
        id: string
        nome: string
        email: string
        senha: string
        contato: string

         constructor (id: string, nome: string, email: string, senha: string, contato: string){
            this.id = id
            this.nome = nome
            this.email = email
            this.senha = senha
            this.contato = contato
        
    }

    }
   