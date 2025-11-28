
import { Column, Entity,  PrimaryColumn } from "typeorm";

@Entity()
export class ESCOLA{
    @PrimaryColumn()
    ID: string;

    @Column({length: 255})
    NOME: string;

    @Column({length: 255})
    HORARIO: string;

    @Column({length: 255})
    DIA: string;

    @Column({length: 255})
    LOCAL: string;

    @Column({length: 255})
    FAIXAETARIA: string;

    
    @Column({length: 255})
    ESPORTE: string;

}   

