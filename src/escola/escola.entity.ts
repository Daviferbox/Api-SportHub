
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class ESCOLA{
    @PrimaryColumn()
    ID: string;

    @Column({length: 255})
    NOME: string;

    @Column('int')
    HORARIO: String;

    @Column({length: 255})
    DIA: string;

    @Column({length: 255})
    LOCAL: string;

    @Column({length: 255})
    FAIXAETARIA: string;

    
    @Column({length: 255})
    ESPORTE: string;



  
}




















// export class escolaEntity{
//     id:string;
//     nome:string;
//     horario:string;
//     dia:string;
//     local:string;
//     faixaEtaria:string;
//     esporte:string;
    
//     constructor( id:string,nome:string,horario:string,dia:string,local:string,
//     faixaEtaria:string,esporte:string){
//         this.id = id;
//         this.nome = nome;
//         this.horario = horario;
//         this.dia = dia;
//         this.local = local;
//         this.faixaEtaria = faixaEtaria;
//         this.esporte = esporte;
//     }
// }