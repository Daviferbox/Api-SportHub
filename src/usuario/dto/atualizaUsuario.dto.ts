import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "src/validator/emailValidator";
import { SenhaForte } from "src/validator/senhaForteValidator";

export class AtualizaUsuarioDTO {
   @IsString()
    @IsNotEmpty({ message: "Nome não pode ser vazio" })
    @IsOptional()
    @ApiProperty({example: 'Davi Fernandes da Silva',
                  description: 'Nome completo do usuário'}
    )
    nome: string;
  
    @IsEmail(undefined, { message: "Email inválido" })
    @EmailUnico({ message: "Já existe usuário com esse email" })
    @IsOptional()
     @ApiProperty({example: 'Daviferbox@gmail.com',
                  description: 'Email do usuário, deve ser único'}
    )
    email: string;
  
    @MinLength(6, { message: "Tamanho da senha inválido" })
    @IsOptional()
    @ApiProperty({example: 'Senha123',
                  description: 'Senha do usuário, deve ter no mínimo 6 caracteres, deve ser forte'}
    )
    @SenhaForte({message: 'A senha deve ser mais forte'})
    senha: string;
  
    @MinLength(6, { message: "Tamanho da senha inválido" })
    @IsOptional()
    @ApiProperty({example: '(14 xxxxx-xxxx)',
                  description: 'contato errado'}
    )
    contato:string
}
