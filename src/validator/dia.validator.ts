import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true })
export class DiaValidator implements ValidatorConstraintInterface {
    constructor() {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const diasValidos = ['domingo', 'segunda-feira', 'terca-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado'];
        if (typeof value === 'string') {            
            return diasValidos.includes(value.toLowerCase());
        }
        return false;
    }
}


export const DiaSemana = (opcoesValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: DiaValidator
        });
    }
}