import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuariosArmazenados } from "src/usuario/usuario.controllers";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuariosArmazenados: UsuariosArmazenados) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    // verifica se já existe email cadastrado
    const usuarioExistente = this.usuariosArmazenados.Usuarios.find(
      (u) => u.email === value
    );
    return !usuarioExistente;
  }

  defaultMessage(args?: ValidationArguments) {
    return "Esse email já está cadastrado.";
  }
}

export function EmailUnico(opcoesValidacao?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: opcoesValidacao,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
}
