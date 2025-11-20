import * as bcrypt from "bcrypt";
// import { PESSOA } from "src/pessoa/pessoa.entity";

import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity()
export class USUARIO{
    @PrimaryColumn()
    ID: string;

    @Column({length: 255})
    NOME: string;

    @Column({length: 255})
    EMAIL: string;

    @Column({length: 255})
    SENHA: string;


    @Column({length: 255})
    CONTATO: string; 



     trocaSenha(senha){
        const saltOrRounds = 10;
        this.SENHA = bcrypt.hashSync(senha,saltOrRounds)
    }


    login(senha: string): boolean{
        return bcrypt.compareSync(senha, this.SENHA);
    }
}

  