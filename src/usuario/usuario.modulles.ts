import { Module } from '@nestjs/common';
import { StrongPassValidator } from 'src/validator/senhaForteValidator';
import { UsuarioService } from './usuario.service';
import { DatabaseModule } from 'src/database/dataBase.module';
import { UsuarioController } from './usuario.controllers';
import { usuarioProviders } from './usuario.provider';
import { EmailUnicoValidator } from 'src/validator/emailValidator';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [
    ...usuarioProviders,
    EmailUnicoValidator,
    UsuarioService,
    StrongPassValidator,
  ],
  exports: [UsuarioService]   // <-- FALTAVA ISSO!!
})
export class UsuarioModule {}
