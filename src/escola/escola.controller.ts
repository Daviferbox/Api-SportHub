import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { criaEscolaDTO } from "./dto/criaescola.dto";
import { alteraEscolaDTO } from "./dto/alteraEscola.dto";
import { ApiTags } from "@nestjs/swagger";
import { RetornoPadraoDTO } from "src/dto/retornoPadrao.dto";
import { escolaService } from "./escola.service";
import { ListaEscolaDTO } from "./dto/listarEscola.dto";

@Controller('/escola')
@ApiTags('escola')
export class EscolaController {
  
  constructor(private escolaService : escolaService){

  }

  @Put('/:id')
  async atualizaEscola(@Param('id') id: string, @Body() dadosAtualizacao: alteraEscolaDTO){
    const escolaAtualizado = await this.escolaService.alterar(id, dadosAtualizacao);
    return {
        evento: escolaAtualizado,
        message: 'Escola atualizado com sucesso'
    };
  }

  @Delete('/:id')
  async deletaEscola(@Param('id') id: string){
    const EscolaRemovida = await this.escolaService.remover(id);
    return {
        evento: EscolaRemovida,
        message: 'Escola removida com sucesso'
    };
  }

  @Post("/criar")
  async criaEscola(@Body() dadosEscola: criaEscolaDTO): Promise <RetornoPadraoDTO>{       
        var retorno = await this.escolaService.inserir(dadosEscola);   
        return retorno        
    }

  @Get("/listar")
    async retornaEscola(): Promise <ListaEscolaDTO[]>{
            var escolaListados = await this.escolaService.listarTodos();
            const ListaRetorno = escolaListados.map(
                escola => new ListaEscolaDTO(
                    escola .ID,
                    escola .NOME,
                    escola .HORARIO,
                    escola .DIA,
                    escola .LOCAL,
                    escola .FAIXAETARIA,
                    escola .ESPORTE,
                )
            );
    
            const retorno = ListaRetorno;
    
    
            return retorno
        }
  
  
  
  // async retornaEscola(): Promise<ESCOLA[]> {  
    //     var escolaListados = this.Escola.Escola;
    //     return escolaListados;    
    // }

}