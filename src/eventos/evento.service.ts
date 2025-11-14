import {Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { RetornoPadraoDTO } from "src/dto/retornoPadrao.dto";
import {v4 as uuid} from 'uuid';
import { EVENTO } from "./evento.entity";
import { criaEventoDTO } from "./dto/criaEvento.dto";
import { alteraEventoDTO } from "./dto/alteraEvento.dto";

@Injectable()
export class EventoService{
     constructor(
        @Inject('EVENTO_REPOSITORY')
        private eventoRepository: Repository<EVENTO>,
    ) {}

     async inserir(dados: criaEventoDTO): Promise<RetornoPadraoDTO> {
        let evento = new EVENTO();
        evento.ID = uuid();
        evento.NOME = dados.NOME;
        evento.DESCRICAO = dados.DESCRICAO;
        evento.HORARIO = dados.HORARIO;
        evento.DIA = dados.DIA;
        evento.LOCAL = dados.LOCAL;
        evento.IDADE = dados.IDADE;
        evento.ESPORTE = dados.ESPORTE;
      
      

        return this.eventoRepository.save(evento)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: evento.ID,
                message: "Evento criado com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao inserir evento:',error.message);
        });
    }

    async localizaID(id: string): Promise<EVENTO> {
        const evento = await this.eventoRepository.findOne({
            where: { ID: id },
        });
        if (!evento) {
            throw new Error('Evento não encontrado');
        }
        return evento
    }

     async remover(id: string): Promise<RetornoPadraoDTO> {
        const evento =  await this.localizaID(id);

        return this.eventoRepository.remove(evento)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: evento.ID,
                message: "Evento Excluido com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao excluir evento:',error.message);
        });
    }



     async alterar(id: string, dados: alteraEventoDTO): Promise<RetornoPadraoDTO> {
        const evento = await this.localizaID(id);

            return this.eventoRepository.save(evento)
        .then((result)=> {
            return <RetornoPadraoDTO>{
                data: evento.ID,
                message: "Evento alterado com sucesso"
            };
        })
        .catch((error)=>{
            throw new Error('Erro ao alterar evento:',error.message);
        });
    }
   
   
   
    async listarTodos(): Promise<EVENTO[]> {    
        return this.eventoRepository.find();
    }
}
   