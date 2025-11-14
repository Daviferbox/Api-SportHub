import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import zxcvbn from 'zxcvbn';

@Injectable()
@ValidatorConstraint({ async: true })
export class StrongPassValidator implements ValidatorConstraintInterface {
    constructor() {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const result = zxcvbn(value);
        var validarSenha = result.score >= 3; // Score mínimo de 3 para considerar a senha forte
        return validarSenha;
    }
}


export const SenhaForte = (opcoesValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: StrongPassValidator
        });
    }
}