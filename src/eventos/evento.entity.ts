import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm"


@Entity()  /*Padrao typeorm pois a integração sera com MYSql*/
export class EVENTO{
    
    @PrimaryColumn()
    ID: string;

    @Column({length: 255})
    NOME: string;
    
    @Column({length: 500})
    DESCRICAO: string

    @Column('int')
    HORARIO: string;


    @Column('int')
    DIA:string;

    @Column({length: 255})
    LOCAL: string;

    @Column({length: 255})
    IDADE: string;
    
    @Column({length: 255})
    ESPORTE: string;

  
    }
