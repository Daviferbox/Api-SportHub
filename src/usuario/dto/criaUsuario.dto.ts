import { IsString, IsEmail, IsNotEmpty, Matches,  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SenhaForte } from 'src/validator/senhaForteValidator';
import { EmailUnico} from 'src/validator/emailValidator';

export class criaUsuarioDTO {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @ApiProperty({example: '123',
    description: 'ID único da escola'})
   NOME: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  @ApiProperty({example: 'usuario@gmail.com',
  description: 'Seu email ou o email proprio da instituição'})
  @EmailUnico({message: "Já existe usuário com esse email"})
  EMAIL: string;

  @IsNotEmpty()
  @SenhaForte({ message: 'Senha fraca. Use letras maiúsculas, minúsculas, números e símbolos.' })
  @ApiProperty({example: 'Davi!@_2453',
  description: 'Sua senha'})
  SENHA: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @Matches(/^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/, {
    message: 'Telefone inválido. Use o formato (XX) XXXXX-XXXX',
  })
  @ApiProperty({example: '(14) 8776-6574',
    description: 'Seu telefone'})
  CONTATO:string
}
