import { Injectable } from "@nestjs/common";
import { 
    registerDecorator, 
    ValidationArguments, 
    ValidationOptions, 
    ValidatorConstraint, 
    ValidatorConstraintInterface 
} from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true })
export class DiaValidator implements ValidatorConstraintInterface {

    private diasValidos: Set<string>;

    constructor() {
        this.diasValidos = this.gerarVariacoes([
            'domingo',
            'segunda-feira',
            'terca-feira',
            'quarta-feira',
            'quinta-feira',
            'sexta-feira',
            'sabado'
        ]);
    }

    // Gera todas as variações possíveis dos dias
    private gerarVariacoes(diasBase: string[]): Set<string> {
        const variacoes = new Set<string>();

        for (const dia of diasBase) {
            const base = dia;                // ex: segunda-feira
            const semHifen = dia.replace('-', ' ');  // ex: segunda feira

            const formas = [base, semHifen];

            formas.forEach(f => {
                const minusculo = f.toLowerCase();
                const capitalizado = f.charAt(0).toUpperCase() + f.slice(1);
                const cadaPalavraMaiuscula = f
                    .split(/[- ]/)
                    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
                    .join(f.includes('-') ? '-' : ' ');

                variacoes.add(minusculo);
                variacoes.add(capitalizado);
                variacoes.add(cadaPalavraMaiuscula);
            });
        }

        return variacoes;
    }

    async validate(value: any): Promise<boolean> {
    if (typeof value !== 'string') return false;

    // divide por vírgula e remove espaços
    const partes = value.split(',').map(p => p.trim());

    // cada item precisa ser um dia válido
    return partes.every(p => this.diasValidos.has(p));
}

}

export const DiaSemana = (opcoesValidacao: ValidationOptions = {}) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: DiaValidator,
        });
    };
};
