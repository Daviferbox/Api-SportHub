import { Injectable } from "@nestjs/common";
import { EventoEntity } from "./evento.entity";

@Injectable()
export class EventosArmazenados{
    #eventos: EventoEntity[] = [];  

    adicionarEvento(evento: EventoEntity){
        this.#eventos.push(evento);
    }   

    async atualizaEvento(id: string, dadosAtualizacao: Partial<EventoEntity>) {
        var possivelEvento = this.BuscaPorID(id);
        
        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return;
                }else if (valor === undefined) {
                    return; 
                }
                possivelEvento[chave] = valor;
            }
        );

        return possivelEvento;
    }

    async removeEventos(id: string) {
        const eventos = this.BuscaPorID(id);

        this.#eventos = this.#eventos.filter(
            eventosSalvo => eventosSalvo.id !== id
        );

        return eventos;
    }
 

    BuscaPorID(id: string): EventoEntity {
        const possivelEvento = this.#eventos.find(
            eventoSalvo => eventoSalvo.id === id
        );  
        if (!possivelEvento) {
            throw new Error('Evento não encontrado');
        }   
        return possivelEvento;
    }

    get eventos(): EventoEntity[]{
        return this.#eventos;
    }
}