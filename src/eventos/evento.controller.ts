import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { criaEventoDTO } from "./dto/criaEvento.dto";
import { alteraEventoDTO } from "./dto/alteraEvento.dto";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EventoService } from "./evento.service";
import { RetornoPadraoDTO } from "src/dto/retornoPadrao.dto";
import { ListaEventoDTO } from "./dto/listaEvento.dto";

@Controller('/eventos')
@ApiTags('eventos')
export class EventosController {
  constructor(private readonly eventoService : EventoService){

  }

  @Post()
    @ApiCreatedResponse({ description:'Retorna que houve sucesso na inclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na inclusão.'})
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    
    async criaEvento(@Body() dadosEvento: criaEventoDTO): Promise <RetornoPadraoDTO>{       
        var retorno = await this.eventoService.inserir(dadosEvento);   
        return retorno        
    }

    
    @Put('/:id')
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na alteração'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na alteração.'})
    @ApiResponse({status: 400, description:'Retorna que há algum dado inválido na requisição.'})
    
    async alteraFilme(@Body() dadosNovos: alteraEventoDTO,@Param('id') id: string){
        var retorno = await this.eventoService.alterar(id, dadosNovos);
        return retorno;       
        
    }

    
    @Delete('/:id')
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na exclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na exclusão.'})
    
    async removeEvento(@Param('id') id: string){      
        var retorno = await this.eventoService.remover(id);        
        return retorno;               
    }

    
    @Get('/listar/:ID')
    @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na consulta.'})
    
    async retornaEventoId(@Param('ID') ID:string){
        var eventosListados = await this.eventoService.localizaID(ID);
        
         return {
                Evento: eventosListados
            };
    }

    // @ApiResponse({status: 200, description:'Retorna que houve sucesso na consulta'})
    @Get("/listar")        
    async retornaEvento(): Promise <ListaEventoDTO[]>{
        var eventoListados = await this.eventoService.listarTodos();
        const ListaRetorno = eventoListados.map(
            evento => new ListaEventoDTO(
                evento.ID,
                evento.NOME,
                evento.DESCRICAO,
                evento.LOCAL,
                evento.DIA,
                evento.HORARIO,
                evento.ESPORTE,
            )
        );

        const retorno = ListaRetorno;


        return retorno
    }


}