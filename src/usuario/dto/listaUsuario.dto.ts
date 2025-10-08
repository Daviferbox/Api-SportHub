export class ListaUsuarioDTO{
    constructor(
        readonly id: string,
        readonly nome: string,
        readonly email: string,
        readonly senha: string,
        readonly contato: string,
    ){}
}