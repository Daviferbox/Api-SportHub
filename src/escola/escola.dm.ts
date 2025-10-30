import { Injectable } from "@nestjs/common";
import { escolaEntity } from "./escola.entity";

@Injectable()
export class EscolaArmazenados{
    #escola: escolaEntity[] = [];  

    adicionarEscola(escola: escolaEntity){
        this.#escola.push(escola);
    }   

    async atualizaEscola(id: string, dadosAtualizacao: Partial<escolaEntity>) {
        var possivelEscola = this.BuscaPorID(id);
        
        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if (chave === 'id') {
                    return;
                }else if (valor === undefined) {
                    return; 
                }
                possivelEscola[chave] = valor;
            }
        );

        return possivelEscola;
    }

    async removeEscola(id: string) {
        const escola = this.BuscaPorID(id);

        this.#escola= this.escola.filter(
            escolasSalvo => escolasSalvo.id !== id
        );

        return escola;
    }
 

    BuscaPorID(id: string): escolaEntity {
        const possivelEscola = this.#escola.find(
            escolaSalvo => escolaSalvo.id === id
        );  
        if (!possivelEscola) {
            throw new Error('Escola não encontrado');
        }   
        return possivelEscola;
    }

    get escola(): escolaEntity[]{
        return this.#escola;
    }
}