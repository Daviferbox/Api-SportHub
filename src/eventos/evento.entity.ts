export class EventoEntity{
    id: string;
    nome: string;    
    horario: string;
    dia: string;
    constructor(id: string,nome: string,horario: string,dia: string){
        this.id = id;
        this.nome = nome;       
        this.horario = horario;
        this.dia = dia;
    }
}   