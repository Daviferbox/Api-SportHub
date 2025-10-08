import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DiaSemana } from "src/validator/dia.validator";

export class alteraEventoDTO {
    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    @ApiPropertyOptional({example: 'Voley',
                        description: 'Nome do evento'}
        )
    nome: string;    

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O horario não pode ser vazio'})
    @ApiPropertyOptional({example: '18:00',
                        description: 'Horário do evento no formato HH:MM'}
        )
    horario: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({message: 'O dia não pode ser vazio'})
    @DiaSemana({message: 'O dia deve ser um dia da semana válido'})
    @ApiPropertyOptional({example: 'Segunda-feira',
                        description: 'Dia da semana em que o evento ocorre, deve ser um dia válido'}
        )
    dia: string;

}