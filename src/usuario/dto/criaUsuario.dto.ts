import { IsString, IsEmail, IsNotEmpty, Matches,  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SenhaForte } from 'src/validator/senhaForteValidator';

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
  EMAIL: string;

 
  @IsString()
  @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
  @ApiProperty({example: '(14) 8776-6574',
    description: 'Seu telefone'})
  CONTATO:string

  @IsNotEmpty()
  @SenhaForte({ message: 'Senha fraca. Use letras maiúsculas, minúsculas, números e símbolos.' })
  @ApiProperty({example: 'Davi!@_2453',
  description: 'Sua senha'})
  SENHA: string;

}
