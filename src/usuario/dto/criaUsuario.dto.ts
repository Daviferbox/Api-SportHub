import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { SenhaForte } from 'src/validator/senhaForteValidator';

export class criaUsuarioDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
 NOME: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  EMAIL: string;

  @IsNotEmpty()
  @SenhaForte({ message: 'Senha fraca. Use letras maiúsculas, minúsculas, números e símbolos.' })
  SENHA: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @Matches(/^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/, {
    message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX',
  })
  CONTATO:string
}
