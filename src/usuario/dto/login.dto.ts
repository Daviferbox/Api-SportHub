import { IsString, IsEmail, MinLength, IsNotEmpty, IsNumber } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class LoginDTO {
        @IsEmail(undefined,{message: 'Email inválido'})
        @IsString()
        @IsNotEmpty()        
        @ApiPropertyOptional({example: 'joaosilva@joao.com.br',
            description: 'Email do usuário, deve ser único'}
            )
        EMAIL: string;

        @MinLength(6,{message: 'A senha deve ter no mínimo 6 caracteres'})
        @IsNotEmpty()
        @IsString()
        @ApiPropertyOptional({example: 'senha123',  
            description: 'Senha do usuário, deve ter no mínimo 6 caracteres'}
            )
        SENHA: string;
}