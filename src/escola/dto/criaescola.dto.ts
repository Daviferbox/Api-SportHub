import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { DiaSemana } from 'src/validator/dia.validator';
import { SenhaForte } from 'src/validator/senhaForteValidator';

export class criaEscolaDTO {
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
      @IsNotEmpty({message: 'O horario não pode ser vazio'})
      @ApiProperty({example: '18:00',
                      description: 'Horário do evento no formato HH:MM'}
      )
      HORARIO: string;
  
      @IsString()
      @IsNotEmpty({message: 'O dia não pode ser vazio'})
      @DiaSemana({message: 'O dia deve ser um dia da semana válido'})
      @ApiProperty({example: 'Segunda-feira',
                      description: 'Dia da semana em que o evento ocorre, deve ser um dia válido'}
      )
      DIA: string;
  
      @IsString()
      @IsNotEmpty({message: 'O nome não pode ser vazio'})
      @IsNotEmpty({message: 'O horario não pode ser vazio'})
      LOCAL:string  
      
      @IsString()
      @IsNotEmpty({message: 'O nome não pode ser vazio'})
      @IsNotEmpty({message: 'O horario não pode ser vazio'})
      FAIXAETARIA:string
      
      @IsString()
      @IsNotEmpty({message: 'O nome não pode ser vazio'})
      @IsNotEmpty({message: 'O horario não pode ser vazio'})
      ESPORTE:string
  

 
}
