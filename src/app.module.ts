import { Module } from '@nestjs/common';
import { EventoModule } from './eventos/evento.modules';
import { UsuarioModule } from './usuario/usuario.modulles';
import { escolaModule } from './escola/escola.modules';
import { FilesModule } from './files/files.module';





// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [UsuarioModule,escolaModule,EventoModule,FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
