import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { EscolaArmazenados } from "./escola.dm";
import { criaEscolaDTO } from "./criaescola.dto";
import { escolaEntity } from "./escola.entity";
import {v4 as uuid} from 'uuid';
import { alteraEscolaDTO } from "./alteraEscola.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('/escola')
@ApiTags('escola')
export class EscolaController {
  constructor(private Escola : EscolaArmazenados){

  }

  @Put('/:id')
  async atualizaEscola(@Param('id') id: string, @Body() dadosAtualizacao: alteraEscolaDTO){
    const escolaAtualizado = await this.Escola.atualizaEscola(id, dadosAtualizacao);
    return {
        evento: escolaAtualizado,
        message: 'Escola atualizado com sucesso'
    };
  }

  @Delete('/:id')
  async deletaEscola(@Param('id') id: string){
    const EscolaRemovida = await this.Escola.removeEscola(id);
    return {
        evento: EscolaRemovida,
        message: 'Escola removida com sucesso'
    };
  }

  @Post()
  async criarEscola(@Body() dadosEscola:criaEscolaDTO){
    var novaEscola = new escolaEntity(uuid(),dadosEscola.nome,dadosEscola.horario,dadosEscola.dia,dadosEscola.local,dadosEscola.faixaEtaria,dadosEscola.esporte);
    this.Escola.adicionarEscola(novaEscola);
    var retorno = {
        novaEscola,
        message: 'Escola criada com sucesso'
    };
    return retorno;
  }

  @Get()
    async retornaEscola(): Promise<escolaEntity[]> {  
        var escolaListados = this.Escola.escola;
        return escolaListados;    
    }

}