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

    // @Column({length: 255})
    // IDPESSOA: string; 

    // @Column({length: 255})
    // FOTO:string;


    // @OneToOne(() => PESSOA)
    // @JoinColumn({ name: 'IDPESSOA', referencedColumnName:'ID'})
    // PESSOA: PESSOA;

    // @OneToOne(() => FILES)
    // @JoinColumn({ name: 'FOTO', referencedColumnName:'ID'})
    // FILE: FILES;
    
   
   

   // export class UsuarioEntity{
    //     id: string
    //     nome: string
    //     email: string
    //     senha: string
    //     contato: string

    //      constructor (id: string, nome: string, email: string, senha: string, contato: string){
    //         this.id = id
    //         this.nome = nome
    //         this.email = email
    //         this.senha = senha
    //         this.contato = contato
        
    // }

    // }
   