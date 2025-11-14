import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DiaSemana } from "src/validator/dia.validator";
import { SenhaForte } from "src/validator/senhaForteValidator";

export class alteraEscolaDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @ApiPropertyOptional({example: 'Voley',
                        description: 'Nome do evento'}
        )
     NOME: string;  
    
    
     @IsEmail({}, { message: 'Email inválido' })
     @IsNotEmpty()
     EMAIL: string;
    
      @IsNotEmpty()
      @SenhaForte({ message: 'Senha fraca. Use letras maiúsculas, minúsculas, números e símbolos.' })
      SENHA: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    @ApiPropertyOptional({example: '18:00',
                        description: 'Horário do evento no jeito certo tipo 22:22'}
        )
     HORARIO: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O dia não pode ser vazio'})
    @DiaSemana({message: 'O dia deve ser um dia da semana válido'})
    @ApiPropertyOptional({example: 'Segunda-feira',
                        description: 'Dia da semana em que o evento ocorre, deve ser um dia válido'}
        )
     DIA: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    @ApiPropertyOptional({example: 'Rua:Nuno de assis',
                        description: 'Horário do evento no jeito certo tipo 22:22'}
        )
     LOCAL:string  

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    @ApiPropertyOptional({example: '18:00',
                        description: 'Horário do evento no jeito certo tipo 22:22'}
        )
     FAIXAETARIA:string

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    @ApiPropertyOptional({example: '18:00',
                        description: 'Horário do evento no jeito certo tipo 22:22'}
        )
     ESPORTE:string
}