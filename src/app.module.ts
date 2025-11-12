import { Module } from '@nestjs/common';
import { EventoModule } from './eventos/evento.modules';
import { UsuarioModule } from './usuario/usuario.modulles';
import { EscolaModule } from './escola/escola.modules';




// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [UsuarioModule,EscolaModule,EventoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
