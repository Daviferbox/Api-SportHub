import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function SenhaForte(opcoesValidacao?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: opcoesValidacao,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== "string") return false;
          return (
            value.length >= 8 &&
            /[A-Z]/.test(value) && // pelo menos uma letra maiúscula
            /[a-z]/.test(value) && // pelo menos uma letra minúscula
            /[0-9]/.test(value) && // pelo menos um número
            /[\W_]/.test(value)    // pelo menos um caractere especial
          );
        },
        defaultMessage(args: ValidationArguments) {
          return "A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.";
        },
      },
    });
  };
}
