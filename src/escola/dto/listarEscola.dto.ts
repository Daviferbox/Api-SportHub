export class ListaEscolaDTO{
    constructor(
            readonly ID: string, 
            readonly NOME:string,
            readonly HORARIO: string,
            readonly DIA: string, 
            readonly LOCAL: string,
            readonly FAIXAETARIA: string,
            readonly ESPORTE: string,        
    ){}
}