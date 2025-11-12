export class ListaEventoDTO{
    constructor(
            readonly ID: string, 
            readonly NOME:string,
            readonly LOCAL: string,
            readonly DIA: string, 
            readonly HORARIO: string,
            readonly ESPORTE: string,        
    ){}
}