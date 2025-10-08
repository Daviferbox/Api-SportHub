import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EventosArmazenados } from "./evento.dm";
import { criaEventoDTO } from "./dto/criaEvento.dto";
import { EventoEntity } from "./evento.entity";
import {v4 as uuid} from 'uuid';
import { alteraEventoDTO } from "./dto/alteraEvento.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('/eventos')
@ApiTags('eventos')
export class EventosController {
  constructor(private Eventos : EventosArmazenados){

  }

  @Put('/:id')
  async atualizaEvento(@Param('id') id: string, @Body() dadosAtualizacao: alteraEventoDTO){
    const eventoAtualizado = await this.Eventos.atualizaEvento(id, dadosAtualizacao);
    return {
        evento: eventoAtualizado,
        message: 'Evento atualizado com sucesso'
    };
  }

  @Delete('/:id')
  async deletaEvento(@Param('id') id: string){
    const eventoRemovido = await this.Eventos.removeEventos(id);
    return {
        evento: eventoRemovido,
        message: 'Evento removido com sucesso'
    };
  }

  @Post()
  async criarEvento(@Body() dadosEvento:criaEventoDTO){
    var novoEvento = new EventoEntity(uuid(),dadosEvento.nome,dadosEvento.horario,dadosEvento.dia);
    this.Eventos.adicionarEvento(novoEvento);
    var retorno = {
        novoEvento,
        message: 'Evento criado com sucesso'
    };
    return retorno;
  }

  @Get()
    async retornaEvento(): Promise<EventoEntity[]> {  
        var eventosListados = this.Eventos.eventos;
        return eventosListados;    
    }

}