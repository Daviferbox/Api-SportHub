import { Injectable } from "@nestjs/common";
import { eventoEntity } from "./evento.entity";

@Injectable()
export class EventosArmazenados{
    #eventos: eventoEntity[] = [];  

    adicionarEvento(evento: eventoEntity){
        this.#eventos.push(evento);
    }   

    async atualizaEvento(id: string, dadosAtualizacao: Partial<eventoEntity>) {
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
 

    BuscaPorID(id: string): eventoEntity {
        const possivelEvento = this.#eventos.find(
            eventoSalvo => eventoSalvo.id === id
        );  
        if (!possivelEvento) {
            throw new Error('Evento não encontrado');
        }   
        return possivelEvento;
    }

    get eventos(): eventoEntity[]{
        return this.#eventos;
    }
}