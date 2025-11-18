import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {

  constructor(private usuarioService: UsuarioService) {}

  async validate(value: string): Promise<boolean> {
    const usuario = await this.usuarioService.localizarEmail(value);
    return !usuario; // true → válido; false → email já existe
  }

  defaultMessage(args?: ValidationArguments) {  
    return "Esse email já está cadastrado.";
  }
}

export function EmailUnico(options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
}
