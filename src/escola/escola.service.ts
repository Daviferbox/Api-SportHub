import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ESCOLA } from "./escola.entity";
import { criaEscolaDTO } from "./dto/criaescola.dto";
import { RetornoPadraoDTO } from "src/dto/retornoPadrao.dto";
import {v4 as uuid} from 'uuid';
import { alteraEscolaDTO } from "./dto/alteraEscola.dto";

@Injectable()
export class escolaService {
    constructor(
        @Inject('ESCOLA_REPOSITORY')
        private escolaRepository: Repository<ESCOLA>,
        
    ) {}



    async inserir(dados: criaEscolaDTO): Promise<RetornoPadraoDTO> {
        let escola = new ESCOLA();
        escola.ID = uuid();
        escola.NOME = dados.NOME;
        escola.HORARIO = dados.HORARIO;
        escola.DIA = dados.DIA;
        escola.LOCAL = dados.LOCAL;
        escola.FAIXAETARIA = dados.FAIXAETARIA;
        escola.ESPORTE = dados.ESPORTE;
        

        return this.escolaRepository.save(escola)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: escola.ID,
                message: "Escola criada com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao inserir Escola:',error.message);
        });
    }

    async remover(id: string): Promise<RetornoPadraoDTO> {
        const escola =  await this.localizaID(id);

        return this.escolaRepository.remove(escola)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: escola.ID,
                message: "Escola Excluida com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao excluir escola:',error.message);
        });
    }

    async localizaID(id: string): Promise<ESCOLA> {
        const escola = await this.escolaRepository.findOne({
            where: { ID: id },
        });
        if (!escola) {
            throw new Error('Escola não encontrado');
        }
        return escola
    }

    async alterar(id: string, dados: alteraEscolaDTO): Promise<RetornoPadraoDTO> {
        const escola = await this.localizaID(id);

        

            return this.escolaRepository.save(escola)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: escola.ID,
                message: "Escola alterada com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao alterar escola:',error.message);
        });
    }

    async listarTodos(): Promise<ESCOLA[]> {    
        return this.escolaRepository.find();
    }
}