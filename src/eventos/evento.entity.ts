export class eventoEntity{
    id:string;
    nome:string;
    horario:string;
    dia:string;
    local:string;
    faixaEtaria:string;
    esporte:string;
    
    constructor( id:string,nome:string,horario:string,dia:string,local:string,
    faixaEtaria:string,esporte:string){
        this.id = id;
        this.nome = nome;
        this.horario = horario;
        this.dia = dia;
        this.local = local;
        this.faixaEtaria = faixaEtaria;
        this.esporte = esporte;
    }
}