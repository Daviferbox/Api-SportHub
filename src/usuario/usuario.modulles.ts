import { Module } from '@nestjs/common';
import { StrongPassValidator } from 'src/validator/senhaForteValidator';
import { UsuarioService } from './usuario.service';
import { DatabaseModule } from 'src/database/dataBase.module';
import { UsuarioController } from './usuario.controllers';
import { usuarioProviders } from './usuario.provider';


@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [...usuarioProviders,
    UsuarioService,
    StrongPassValidator
    ],
})
export class UsuarioModule {}